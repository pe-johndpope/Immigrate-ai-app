from actions import helpers
from actions.federal import FederalEligibility


class NewBrunswickEligibility:
    def nb_express_entry(self, tracker):
        return 22 <= helpers.calculate_age(
            tracker
        ) <= 55 and FederalEligibility.federal_skilled_worker(tracker)

    def nb_entrepreneur(self, tracker):
        return (
            22 <= helpers.calculate_age(tracker) <= 55
            and helpers.language_test(tracker, 5)
            and tracker.slots.get("net_worth") >= 600000
            and helpers.education(tracker) >= helpers.EducationLevels.POST_SECONDARY
            and tracker.slots.get("work_experience_global") >= 3
        )

    def nb_post_graduate_entrepreneurial(self, tracker):
        return (
            22 <= helpers.calculate_age(tracker) <= 40
            and tracker.slots.get("work_permit")
            and tracker.slots.get("work_experience_canada") >= 1
            and helpers.language_test(tracker, 7)
            and helpers.education(tracker) >= helpers.EducationLevels.POST_SECONDARY
        )

    def nb_skilled_worker(self, tracker):
        return (
            19 <= helpers.calculate_age(tracker) <= 55
            and tracker.slots.get("work_experience_global") >= 1
            and helpers.education(tracker) >= helpers.EducationLevels.SECONDARY
        )

    def nb_eligibility(self, tracker):
        eligibility = []
        if self.nb_express_entry(tracker):
            eligibility.append("New Brunswick Express Entry Labour Market Stream")
        if self.nb_entrepreneur(tracker):
            eligibility.append("New Brunswick Entrepreneurial Stream")
        if self.nb_post_graduate_entrepreneurial(tracker):
            eligibility.append("New Brunswick Post Graduate Entrepreneurial Stream")
        if self.nb_skilled_worker(tracker):
            eligibility.append("New Brunswick Skilled Workers with Employer Support")
        return eligibility
