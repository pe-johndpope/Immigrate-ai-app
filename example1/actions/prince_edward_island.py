from actions import helpers


class PrinceEdwardIslandEligibility:
    def pei_express_entry(self, tracker):
        return helpers.federal_program(tracker)

    def pei_skilled_worker(self, tracker):
        return (
            18 <= helpers.calculate_age(tracker) <= 59
            and tracker.slots.get("work_experience_global") >= 2
            and helpers.education(tracker) >= helpers.EducationLevels.POST_SECONDARY
            and tracker.slots.get("job_offer")
            and tracker.slots.get("occupation") in ["0", "A", "B"]
        )

    def pei_critical_worker(self, tracker):
        return (
            18 <= helpers.calculate_age(tracker) <= 59
            and helpers.language_test(tracker, 4)
            and helpers.education(tracker) >= helpers.EducationLevels.SECONDARY
            and tracker.slots.get("job_offer")
            and tracker.slots.get("occupation") in ["C", "D"]
        )

    def pei_international_graduate(self, tracker):
        return (
            18 <= helpers.calculate_age(tracker) <= 59
            and tracker.slots.get("work_permit")
            and tracker.slots.get("occupation") in ["0", "A", "B"]
        )

    def pei_entrepreneur(self, tracker):
        return (
            21 <= helpers.calculate_age(tracker) <= 59
            and helpers.education(tracker) >= helpers.EducationLevels.SECONDARY
            and tracker.slots.get("net_worth") >= 600000
        )

    def pei_eligibility(self, tracker):
        eligibility = []
        if self.pei_express_entry(tracker):
            eligibility.append("Prince Edward Island Express Entry")
        if self.pei_skilled_worker(tracker):
            eligibility.append("Prince Edward Island Skilled Workers")
        if self.pei_critical_worker(tracker):
            eligibility.append("Prince Edward Island International Graduate")
        if self.pei_international_graduate(tracker):
            eligibility.append("Prince Edward Island International Graduate")
        if self.pei_entrepreneur(tracker):
            eligibility.append("Prince Edward Island Entrepreneur")
        return eligibility
