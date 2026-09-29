import os
from abc import ABC, abstractmethod
from apps.providers.models import Provider

class BaseLLMProvider(ABC):
    @abstractmethod
    def generate_advisory_response(self, prompt, context_documents=None):
        pass

class DummyAdvisoryProvider(BaseLLMProvider):
    """
    Default fallback advisory LLM Provider for non-clinical healthcare navigation.
    """
    def generate_advisory_response(self, prompt, context_documents=None):
        prompt_lower = prompt.lower()
        
        is_urgent = any(kw in prompt_lower for kw in ['chest pain', 'breathlessness', 'severe bleeding', 'unconscious'])
        
        if 'fever' in prompt_lower:
            pathway = "Internal Medicine / General Physician Evaluation"
            advice = "For persistent fever over 3 days, a complete blood count (CBC) and general physician consult is advised."
        elif 'knee' in prompt_lower or 'joint' in prompt_lower or 'ortho' in prompt_lower:
            pathway = "Orthopedic Specialist & Diagnostic Radiology"
            advice = "Consider an orthopedic physical evaluation. Diagnostic imaging (X-Ray/MRI) may be recommended by the doctor."
        elif 'blood' in prompt_lower or 'test' in prompt_lower or 'lipid' in prompt_lower:
            pathway = "Diagnostic Pathology & Preventive Health Screening"
            advice = "Schedule a fast-track diagnostic blood collection at a verified laboratory."
        else:
            pathway = "General Physician & OPD Consultation"
            advice = "Based on your description, consulting a General Physician is the recommended first step."

        if is_urgent:
            advice = "⚠️ URGENT NOTICE: Your symptoms suggest potential acute emergency warning signs. Please visit the nearest Emergency OPD or call emergency services immediately."
            pathway = "Emergency Medicine & Urgent OPD Evaluation"

        return {
            "pathway": pathway,
            "advice": advice,
            "is_urgent": is_urgent,
            "provider_name": "DummyAdvisoryLLM"
        }

class OpenAIProvider(BaseLLMProvider):
    def generate_advisory_response(self, prompt, context_documents=None):
        # Stub for OpenAI API integration
        api_key = os.getenv('LLM_API_KEY')
        if not api_key or api_key == 'mock-key':
            return DummyAdvisoryProvider().generate_advisory_response(prompt, context_documents)
        
        return DummyAdvisoryProvider().generate_advisory_response(prompt, context_documents)

class NavigatorService:
    @staticmethod
    def get_llm_provider():
        provider_type = os.getenv('LLM_PROVIDER', 'dummy').lower()
        if provider_type == 'openai':
            return OpenAIProvider()
        return DummyAdvisoryProvider()

    @classmethod
    def process_navigation_query(cls, user, care_journey, prompt_text, attachments=None, city='Bangalore'):
        llm = cls.get_llm_provider()
        llm_response = llm.generate_advisory_response(prompt_text, attachments)

        # Search matching local providers
        providers_qs = Provider.objects.filter(is_active=True)
        if city:
            providers_qs = providers_qs.filter(city__iexact=city)

        recommended_providers = []
        for p in providers_qs[:3]:
            is_sponsored = p.promotions.filter(campaign_status='ACTIVE').exists()
            recommended_providers.append({
                "id": str(p.id),
                "name": p.name,
                "type": p.type,
                "address": p.address,
                "city": p.city,
                "rating": p.rating,
                "is_sponsored": is_sponsored, # Explicit sponsored flag
                "promotion_label": "SPONSORED" if is_sponsored else None
            })

        return {
            "pathway": llm_response["pathway"],
            "message": llm_response["advice"],
            "is_urgent": llm_response["is_urgent"],
            "recommended_providers": recommended_providers,
            "disclaimer": "JetPulse Care Navigator provides informational and healthcare navigation support. It does not diagnose medical conditions or replace professional medical advice."
        }
