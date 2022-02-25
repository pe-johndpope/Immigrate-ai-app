from actions import helpers


class BritishColumbiaEligibility:
    def bc_skilled_worker(self, tracker):
        return (
            tracker.slots.get("job_offer")
            and helpers.federal_program(tracker)
            and tracker.slots.get("occupation") in ["0", "A", "B"]
            and tracker.slots.get("work_experience_global") >= 2
        )

    def bc_healthcare_professional(self, tracker):
        return (
            tracker.slots.get("job_offer")
            and helpers.federal_program(tracker)
            and tracker.slots.get("healthcare_professional")
            and tracker.slots.get("work_experience_global") >= 2
        )

    # check education location
    def bc_international_graduate(self, tracker):
        return (
            tracker.slots.get("job_offer") == True
            and helpers.federal_program(tracker)
            and tracker.slots.get("canadian_graduate")
            and helpers.education(tracker) >= helpers.EducationLevels.UNDERGRADUATE
            and tracker.slots.get("occupation") in ["0", "A", "B"]
        )

    # check level and location of education
    def bc_international_post_graduate(self, tracker):
        return (
            helpers.federal_program(tracker)
            and tracker.slots.get("canadian_graduate")
            and helpers.education(tracker) >= helpers.EducationLevels.GRADUATE
        )

    def bc_entry_level_worker(self, tracker):
        return tracker.slots.get("job_offer") and tracker.slots.get("occupation") in [
            "C",
            "D",
        ]

    def bc_entrepreneur(self, tracker):
        return (
            tracker.slots.get("net_worth") >= 600000
            and tracker.slots.get("work_experience_global") >= 3
        )

    def bc_entrepreneur_regional(self, tracker):
        return (
            tracker.slots.get("net_worth") >= 300000
            and helpers.language_test(tracker, 4)
            and tracker.slots.get("work_experience_global") >= 3
        )

    def bc_strategic_projects(self, tracker):
        return tracker.slots.get("net_worth") >= 500000

    def bc_eligibility(self, tracker):
        eligibility = []
        if self.bc_skilled_worker(tracker):
            eligibility.append("British Columbia Skilled Worker")
        if self.bc_healthcare_professional(tracker):
            eligibility.append("British Columbia Health Professional")
        if self.bc_international_graduate(tracker):
            eligibility.append("British Columbia International Graduate")
        if self.bc_international_post_graduate(tracker):
            eligibility.append("British Columbia International Post-Graduate")
        if self.bc_entry_level_worker(tracker):
            eligibility.append("British Columbia Entry Level Worker")
        if self.bc_entrepreneur(tracker):
            eligibility.append("British Columbia Entrepreneur")
        if self.bc_entrepreneur_regional(tracker):
            eligibility.append("British Columbia Entrepreneur Regional Pilot")
        if self.bc_strategic_projects(tracker):
            eligibility.append("British Columbia Strategic Projects")
        return eligibility
