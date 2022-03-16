# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions

from typing import Any, Text, Dict, List, Optional

from rasa_sdk import Action, Tracker
from rasa_sdk.events import FormValidation, SlotSet, Restarted
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.forms import FormValidationAction
from rasa_sdk.types import DomainDict
import json

from actions import (
    federal,
    permanent_residence,
    temporary_residence,
    alberta,
    british_columbia,
    manitoba,
    new_brunswick,
    newfoundland_and_labrador,
    northwest_territories,
    nova_scotia,
    ontario,
    prince_edward_island,
    quebec,
    saskatchewan,
    yukon,
)

MOCK_CHECKBOX = json.load(
    open("actions/schemas/checkbox.json", "r")
)

class ActionRestart(Action):
    """Executes the fallback action and goes back to the previous state
    of the dialogue"""

    def name(self) -> Text:
        return "action_restart"

    async def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        dispatcher.utter_message(response='utter_restart')

        return [Restarted()]

class ActionAskShowCheckboxFormFoodList(Action):
    """Action Ask Show Checkbox Form Food List."""

    def name(self) -> Text:
        """Unique identifier for the action."""
        return "action_ask_show_checkbox_form_food_list"

    async def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict]:

        dispatcher.utter_message(
            text='Which food do you eat more?',
            json_message=MOCK_CHECKBOX,
        )
        return []

class ActionShowButtons(Action):
    """Show Buttons."""

    def name(self) -> Text:
        """Unique identifier for the action."""
        return "action_show_buttons"

    async def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict]:

        buttons = []
        buttons.extend([
            {"title": 'Yes', "payload": "/affirm{}".format(json.dumps({"response_validation": True}))},
            {"title": 'No', "payload": "/deny{}".format(json.dumps({"response_validation": False}))},
        ])
        dispatcher.utter_message(
            text='Is it correct?',
            buttons=buttons,
        )

        return []

class ActionShowVideo(Action):
    """Show Video."""

    def name(self) -> Text:
        """Unique identifier for the action."""
        return "action_show_video"

    async def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict]:
        
        video = {
            "type": "video",
            "url": "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
        }

        dispatcher.utter_message(
            text='Here is something to cheer you up',
            json_message=video            
        )

        return []


class ActionShowSummary(Action):
    """Show Summary."""

    def name(self) -> Text:
        """Unique identifier for the action."""
        return "action_show_summary"

    async def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict]:

        slots = ["food_list"]
        food_list = tracker.get_slot(slots[0])

        variables = {
            "OPTIONS": food_list,
        }
        dispatcher.utter_message(response='utter_summary', **variables)
        
        return [SlotSet(slot, None) for slot in slots]



class ActionDetermineProvince(Action):
    def name(self) -> Text:
        return "action_determine_province"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:

        province = tracker.slots.get("desired_province")
        eligibility = []

        if province == "alberta":
            eligibility = alberta.AlbertaEligibility().ab_eligibility(tracker)
        elif province == "british_columbia":
            eligibility = british_columbia.BritishColumbiaEligibility().bc_eligibility(
                tracker
            )
        elif province == "manitoba":
            eligibility = manitoba.ManitobaEligibility().mb_eligibility(tracker)
        elif province == "new_brunswick":
            eligibility = new_brunswick.NewBrunswickEligibility().nb_eligibility(
                tracker
            )
        elif province == "newfoundland_and_labrador":
            eligibility = (
                newfoundland_and_labrador.NewfoundlandEligibility().nl_eligibility(
                    tracker
                )
            )
        elif province == "northwest_territories":
            eligibility = (
                northwest_territories.NorthwestTerritoriesEligibility().nwt_eligibility(
                    tracker
                )
            )
        elif province == "nova_scotia":
            eligibility = nova_scotia.NovaScotiaEligibility().ns_eligiblity(tracker)
        elif province == "ontario":
            eligibility = ontario.OntarioEligibility().on_eligibility(tracker)
        elif province == "prince_edward_island":
            eligibility = (
                prince_edward_island.PrinceEdwardIslandEligibility().pei_eligibility(
                    tracker
                )
            )
        elif province == "quebec":
            eligibility = quebec.QuebecEligibility().qc_eligibility(tracker)
        elif province == "saskatchewan":
            eligibility = saskatchewan.SaskatchewanEligibilty().sk_eligibility(tracker)
        elif province == "yukon":
            eligibility = yukon.YukonEligibility().yk_eligibility(tracker)

        response = ""
        if len(eligibility) >= 0:
            response = "You may be eligible to migrate to Canada under:"
        for elem in eligibility:
            response += "\n"
            response += elem
        dispatcher.utter_message(text=response)
        return []


# This action validates the provincial form by removing the desired_province slot if the user doesn't want to check eligibility for a specific province
class ValidateProvincialForm(FormValidationAction):
    def name(self) -> Text:
        return "validate_provincial_form"

    async def required_slots(
        self,
        slots_mapped_in_domain: List[Text],
        dispatcher: "CollectingDispatcher",
        tracker: Tracker,
        domain: DomainDict,
    ) -> Optional[List[Text]]:
        additional_slots = []

        if tracker.slots.get("check_provincial") == False:
            slots_mapped_in_domain.remove("desired_province")

        return additional_slots + slots_mapped_in_domain


# This action determines the eligibility for federal programs (move/study/work/visit)
class ActionDetermineEligibilty(Action):
    def name(self) -> Text:
        return "action_determine_eligibility"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:

        travel_purposes = tracker.slots.get("travel_purposes")

        if travel_purposes == "move":
            eligibility = federal.FederalEligibility().federal_eligibility(tracker)
            response = ""
            if len(eligibility) >= 0:
                response = "You may be eligible to migrate to Canada under:"
            for elem in eligibility:
                response += "\n"
                response += elem
            print(response)
            dispatcher.utter_message(text=response)
        elif travel_purposes == "work":
            score = str(
                temporary_residence.TemporaryResidenceEligibility().calculate_work_eligibility(
                    tracker
                )
            )
            dispatcher.utter_message(text="You may work in Canada")
        elif travel_purposes == "study":
            eligibility = temporary_residence.TemporaryResidenceEligibility().calculate_study_eligibility(
                tracker
            )
            dispatcher.utter_message(text=eligibility)
        elif travel_purposes == "visit":
            eligibility = str(
                temporary_residence.TemporaryResidenceEligibility().calculate_visit_eligibility(
                    tracker
                )
            )
            print(eligibility)
            dispatcher.utter_message(text=eligibility)
        else:
            dispatcher.utter_message(
                text="We're unable to help you at this time")
        return []

# This action validates the eligibility form by removing slots that aren't required (based on the value of prior slots)

from .countries import is_valid_country 

class ValidateEligibilityForm(FormValidationAction):
    def name(self) -> Text:
        return "validate_eligibility_form"
    
    def validate_passport_country(
        self,
        slot_value: Any,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: DomainDict,
    ) -> Dict[Text, Any]:
        print("VALIDATE COUNTRY slot value")
        if is_valid_country(slot_value): 
            return {"passport_country": slot_value}
        else:
            # validation failed
            dispatcher.utter_message(text=f"That's not a country I know. I'm assuming you mis-spelled.")
            return {"passport_country": None}
    
    async def required_slots(
        self,
        domain_slots: List[Text],
        dispatcher: "CollectingDispatcher",
        tracker: Tracker,
        domain: DomainDict,
    ) -> Optional[List[Text]]:
        additional_slots = []

        print(tracker.slots, len(tracker.slots))
        print(domain_slots, len(domain_slots))
        remove = lambda key: domain_slots.remove(key) if (key in domain_slots) else None

        if tracker.slots.get("travel_purposes") == "move":
            remove("passport_country")
            remove("visit_length")
            remove("program_length")
            remove("children_canada")
            remove("education_acceptance")

        if tracker.slots.get("french_test") == False:
            # If the user didn't take the Frnech test, don't ask for their scores
            remove("french_speaking_score")
            remove("french_listening_score")
            remove("french_writing_score")
            remove("french_reading_score")

        if tracker.slots.get("english_test") == "neither":
            # If the user didn't take the English test, don't ask for their scores
            remove("english_speaking_score")
            remove("english_listening_score")
            remove("english_writing_score")
            remove("english_reading_score")

        if tracker.slots.get("skilled_trade") == False:
            remove("certified_skill_trade")

        if tracker.slots.get("travel_purposes") == "visit":
            # If the user didn't take the English test, don't ask for their scores
            remove("program_length")
            remove("education_acceptance")
            # slots_mapped_in_domain.remove("date_of_birth")
            # slots_mapped_in_domain.remove("healthcare_professional")
            remove("occupation")
            remove("skilled_trade")
            remove("certified_skill_trade")
            remove("english_test")
            remove("english_speaking_score")
            remove("english_listening_score")
            remove("english_writing_score")
            remove("english_reading_score")
            remove("french_test")
            remove("french_speaking_score")
            remove("french_listening_score")
            remove("french_writing_score")
            remove("french_reading_score")
            remove("education")
            remove("work_experience_global")
            remove("work_experience_canada")
            remove("job_offer")
            remove("net_worth")

        if (
            tracker.slots.get("travel_purposes") == "visit"
            and tracker.slots.get("visit_length") == True
            and tracker.slots.get("children_canada") == True
        ):
            remove("passport_country")

        if (
            tracker.slots.get("travel_purposes") == "visit"
            and tracker.slots.get("visit_length") == False
        ):
            remove("children_canada")

        if tracker.slots.get("travel_purposes") == "study":
            # If the user didn't take the English test, don't ask for their scores
            remove("visit_length")
            remove("children_canada")
            remove("english_test")
            remove("english_speaking_score")
            remove("english_listening_score")
            remove("english_writing_score")
            remove("english_reading_score")
            remove("french_test")
            remove("french_speaking_score")
            remove("french_listening_score")
            remove("french_writing_score")
            remove("french_reading_score")
            remove("healthcare_professional")
            remove("occupation")
            remove("skilled_trade")
            remove("certified_skill_trade")
            remove("education")
            remove("work_experience_global")
            remove("work_experience_canada")
            remove("job_offer")
            remove("net_worth")

        if tracker.slots.get("travel_purposes") == "work":
            # If the user didn't take the English test, don't ask for their scores
            remove("visit_length")
            remove("passport_country")
            remove("education_acceptance")
            remove("program_length")
            remove("children_canada")
            remove("date_of_birth")
            remove("english_test")
            remove("english_speaking_score")
            remove("english_listening_score")
            remove("english_writing_score")
            remove("english_reading_score")
            remove("french_test")
            remove("french_speaking_score")
            remove("french_listening_score")
            remove("french_writing_score")
            remove("french_reading_score")
            remove("healthcare_professional")
            remove("occupation")
            remove("skilled_trade")
            remove("certified_skill_trade")
            remove("education")
            remove("work_experience_global")
            remove("work_experience_canada")
            remove("job_offer")
            remove("net_worth")

        if (
            tracker.slots.get("travel_purposes") == "study"
            and tracker.slots.get("program_length") == True
        ):
            remove("passport_country")

        if (
            tracker.slots.get("travel_purposes") == "study"
            and tracker.slots.get("program_length") == False
        ):
            remove("education_acceptance")

        return additional_slots + domain_slots 
