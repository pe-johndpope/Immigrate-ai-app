from actions.federal import FederalEligibility
from actions import helpers


class OntarioEligibility:
    def on_human_capital_priorities(self, tracker):

        return (
            helpers.language_test(tracker, 7)
            and (
                FederalEligibility().federal_skilled_worker(tracker)
                or FederalEligibility().canada_experience_class(tracker)
            )
            and helpers.education(tracker) >= helpers.EducationLevels.UNDERGRADUATE
        )

    def on_french_skilled_worker(self, tracker):
        language_test = (
            tracker.slots.get("english_test")
            and tracker.slots.get("english_speaking_score") >= 6
            and tracker.slots.get("english_listening_score") >= 6
            and tracker.slots.get("english_writing_score") >= 6
            and tracker.slots.get("english_reading_score") >= 6
            and tracker.slots.get("french_test")
            and tracker.slots.get("french_speaking_score") >= 7
            and tracker.slots.get("french_listening_score") >= 7
            and tracker.slots.get("french_writing_score") >= 7
            and tracker.slots.get("french_reading_score") >= 7
        )
        return (
            language_test
            and (
                FederalEligibility().federal_skilled_worker(tracker)
                or FederalEligibility().canada_experience_class(tracker)
            )
            and helpers.education(tracker) >= helpers.EducationLevels.UNDERGRADUATE
        )

    def on_skilled_trades(self, tracker):

        return (
            helpers.language_test(tracker, 5)
            and tracker.slots.get("work_experience_canada") >= 1
            and tracker.slots.get("skilled_trade")
        )

    def on_masters_graduate(self, tracker):

        return (
            helpers.language_test(tracker, 7)
            and helpers.education(tracker) >= helpers.EducationLevels.GRADUATE
        )

    def on_phd_graduate(self, tracker):
        return helpers.education(tracker) >= helpers.EducationLevels.GRADUATE

    def on_foreign_workers(self, tracker):
        return tracker.slots.get("job_offer") and tracker.slots.get("occupation") in [
            "0",
            "A",
            "B",
        ]

    def on_international_students(self, tracker):
        return (
            tracker.slots.get("job_offer")
            and tracker.slots.get("occupation") in ["0", "A", "B"]
            and helpers.education(tracker) >= helpers.EducationLevels.POST_SECONDARY
        )

    def on_indemand_skills(self, tracker):
        return (
            tracker.slots.get("job_offer")
            and tracker.slots.get("occupation") in ["C", "D"]
            and helpers.education(tracker) >= helpers.EducationLevels.SECONDARY
        )

    def on_entrepreneur(self, tracker):
        return (
            tracker.slots.get("net_worth") >= 400000
            and helpers.language_test(tracker, 4)
            and tracker.slots.get("work_experience_global") >= 2
        )

    def on_eligibility(self, tracker):
        eligibility = []
        if self.on_human_capital_priorities(tracker):
            eligibility.append("Ontario Human Capital Priorities Express Entry")
        if self.on_french_skilled_worker(tracker):
            eligibility.append("Ontario French-Speaking Skilled Worker - Express Entry")
        if self.on_skilled_trades(tracker):
            eligibility.append("Ontario Skilled Trades - Express Entry")
        if self.on_masters_graduate(tracker):
            eligibility.append("Ontario Masters Graduate")
        if self.on_phd_graduate(tracker):
            eligibility.append("Ontario PhD Graduate")
        if self.on_french_skilled_worker(tracker):
            eligibility.append("Ontario Foreign Workers")
        if self.on_international_students(tracker):
            eligibility.append("Ontario International Students with a Job Offer")
        if self.on_indemand_skills(tracker):
            eligibility.append("Ontario In-Demand Skills")
        if self.on_entrepreneur(tracker):
            eligibility.append("Ontario Entrepreneur")
        return eligibility
