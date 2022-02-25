from actions import helpers


class AlbertaEligibility:
    def ab_express_entry(self, tracker):
        return helpers.federal_program(tracker)

    def ab_farmer(self, tracker):
        return tracker.slots.get("net_worth") >= 500000 and tracker.slots.get("farmer")

    def ab_opportunity_streams(self, tracker):
        return (
            tracker.slots.get("job_offer")
            and helpers.education(tracker) >= helpers.EducationLevels.SECONDARY
            and helpers.language_test(tracker, 4)
            and tracker.slots.get("work_permit")
        )

    def ab_eligibility(self, tracker):
        eligibility = []
        if self.ab_express_entry(tracker):
            eligibility.append("Alberta Express Entry")
        if self.ab_farmer(tracker):
            eligibility.append("Alberta Farmer")
        if self.ab_opportunity_streams(tracker):
            eligibility.append("Alberta Opportunity Stream")
        return eligibility
