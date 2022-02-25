from actions import helpers


class YukonEligibility:
    def yk_express_entry(self, tracker):
        return helpers.federal_program(tracker)

    def yk_skilled_worker(self, tracker):
        return (
            tracker.slots.get("job_offer")
            and tracker.slots.get("work_experience_global") >= 1
            and tracker.slots.get("occupation") in ["0", "A", "B"]
        )

    def yk_critical_impact(self, tracker):
        return (
            tracker.slots.get("job_offer")
            and helpers.education(tracker) >= helpers.EducationLevels.SECONDARY
            and tracker.slots.get("occupation") in ["C", "D"]
        )

    def yk_business(self, tracker):
        return (
            helpers.education(tracker) >= helpers.EducationLevels.SECONDARY
            and tracker.slots.get("net_worth") >= 500000
            and tracker.slots.get("work_experience_global") >= 3
        )

    def yk_eligibility(self, tracker):
        eligibility = []
        if self.yk_express_entry(tracker):
            eligibility.append("Yukon Express Entry")
        if self.yk_skilled_worker(tracker):
            eligibility.append("Yukon Skilled Worker")
        if self.yk_critical_impact(tracker):
            eligibility.append("Yukon Critical Worker")
        if self.yk_business(tracker):
            eligibility.append("Yukon Business Applicant")
        return eligibility
