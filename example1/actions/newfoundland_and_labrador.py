from actions import helpers


class NewfoundlandEligibility:
    def nl_express_entry(self, tracker):
        return (
            tracker.slots.get("work_permit")
            and helpers.language_test(tracker, 5)
            and helpers.education(tracker) >= helpers.EducationLevels.POST_SECONDARY
            and tracker.slots.get("work_experience_global") >= 1
            and tracker.slots.get("job_offer")
            and tracker.slots.get("occupation") in ["0", "A", "B"]
        )

    def nl_skilled_worker(self, tracker):
        return (
            21 <= helpers.calculate_age(tracker) <= 59
            and tracker.slots.get("work_experience_global") >= 1
            and tracker.slots.get("job_offer")
        )

    def nl_international_graduate(self, tracker):
        return (
            tracker.slots.get("work_permit")
            and 21 <= helpers.calculate_age(tracker) <= 59
            and helpers.education(tracker) >= helpers.EducationLevels.POST_SECONDARY
        )

    def nl_international_entrepreneur(self, tracker):
        return (
            21 <= helpers.calculate_age(tracker) <= 59
            and helpers.language_test(tracker, 5)
            and tracker.slots.get("net_worth") >= 600000
            and helpers.education(tracker) >= helpers.EducationLevels.SECONDARY
        )

    def nl_international_graduate_entrepreneur(self, tracker):
        return (
            tracker.slots.get("work_permit")
            and helpers.language_test(tracker, 7)
            and 21 <= helpers.calculate_age(tracker)
            and helpers.education(tracker) >= helpers.EducationLevels.POST_SECONDARY
        )

    def nl_eligibility(self, tracker):
        eligibility = []
        if self.nl_express_entry(tracker):
            eligibility.append("Newfoundland and Labrador Express Entry Skilled Worker")
        if self.nl_skilled_worker(tracker):
            eligibility.append("Newfoundland and Labrador Skilled Worker")
        if self.nl_international_graduate(tracker):
            eligibility.append("Newfoundland and Labrador International Graduate")
        if self.nl_international_entrepreneur(tracker):
            eligibility.append("Newfoundland and Labrador International Entrepreneur")
        if self.nl_international_graduate_entrepreneur(tracker):
            eligibility.append(
                "Newfoundland and Labrador International Graduate Entrepreneur"
            )
        return eligibility
