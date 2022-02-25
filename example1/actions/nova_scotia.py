from actions import helpers


class NovaScotiaEligibility:
    def ns_demand(self, tracker):
        return (
            helpers.language_test(tracker, 7)
            and tracker.slots.get("job_offer")
            and tracker.slots.get("work_experience_global") >= 1
            and helpers.education(tracker) >= helpers.EducationLevels.SECONDARY
        )

    def ns_experience(self, tracker):
        return (
            (
                (
                    helpers.language_test(tracker, 5)
                    and tracker.slots.get("occupation") == "B"
                )
                or (
                    helpers.language_test(tracker, 7)
                    and tracker.slots.get("occupation") in ["0", "A"]
                )
            )
            and tracker.slots.get("work_experience_canada") >= 1
            and 21 <= helpers.calculate_age(tracker) <= 55
            and helpers.education(tracker) >= helpers.EducationLevels.SECONDARY
        )

    def ns_skilled_worker(self, tracker):
        return (
            21 <= helpers.calculate_age(tracker) <= 55
            and self.education(tracker) >= helpers.EducationLevels.SECONDARY
            and tracker.slots.get("job_offer")
            and tracker.slots.get("work_experience_global") >= 1
            and tracker.slots.get("occupation") in ["0", "A", "B"]
        )

    def ns_physicians(self, tracker):
        return tracker.slots.get("health_professional")

    def ns_entrepreneur(self, tracker):

        return (
            helpers.language_test(tracker, 5)
            and 21 <= helpers.calculate_age(tracker)
            and tracker.slots.get("net_worth") >= 600000
            and tracker.slots.get("work_experience_global") >= 3
            and helpers.education(tracker) >= helpers.EducationLevels.SECONDARY
        )

    def ns_international_graduate_entrepreneur(self, tracker):
        return (
            tracker.slots.get("work_permit")
            and helpers.language_test(tracker, 7)
            and 21 <= helpers.calculate_age(tracker)
            and helpers.education(tracker) >= helpers.EducationLevels.POST_SECONDARY
        )

    def ns_labour_market_priorities(self, tracker):
        return tracker.slots.get("work_experience_global") >= 1

    def ns_indemand_occupations(self, tracker):
        return (
            21 <= helpers.calculate_age(tracker) <= 55
            and tracker.slots.get("work_experience_global") >= 1
            and tracker.slots.get("occupation") == "C"
            and helpers.education(tracker) >= helpers.EducationLevels.SECONDARY
        )

    def ns_lowskill_worker(self, tracker):
        return (
            21 <= helpers.calculate_age(tracker) <= 55
            and helpers.education(tracker) >= helpers.EducationLevels.SECONDARY
            and tracker.slots.get("occupation") in ["C", "D"]
        )

    def ns_eligiblity(self, tracker):
        eligibility = []
        if self.ns_demand(tracker):
            eligibility.append("Nova Scotia Demand Express Entry")
        if self.ns_experience(tracker):
            eligibility.append("Nova Scotia Experience Express Entry")
        if self.ns_skilled_worker(tracker):
            eligibility.append("Nova Scotia Skilled Worker")
        if self.ns_physicians(tracker):
            eligibility.append("Nova Scotia Physicians")
        if self.ns_entrepreneur(tracker):
            eligibility.append("Nova Scotia Entrepreneur")
        if self.ns_international_graduate_entrepreneur(tracker):
            eligibility.append("Nova Scotia International Graduate Entrepreneur")
        if self.ns_labour_market_priorities(tracker):
            eligibility.append("Nova Scotia Labour Market Priorities")
        if self.ns_indemand_occupations(tracker):
            eligibility.append("Nova Scotia Occupations in Demand")
        if self.ns_lowskill_worker(tracker):
            eligibility.append("Nova Scotia Semi-Skilled and Low-Skilled Worker")
        return eligibility
