from actions import helpers


class NorthwestTerritoriesEligibility:
    def nwt_express_entry(self, tracker):
        return (
            (
                (
                    helpers.language_test(tracker, 5)
                    and tracker.slots.get("occupation") == "B"
                )
                or (
                    helpers.language_test(tracker, 6)
                    and tracker.slots.get("occupation") in ["0", "A"]
                )
            )
            and tracker.slots.get("work_experience_global") >= 1
            and tracker.slots.get("job_offer")
        )

    def nwt_critical_impact(self, tracker):
        return tracker.slots.get("job_offer") and tracker.slots.get("occupation") in [
            "C",
            "D",
        ]

    def nwt_skilled_worker(self, tracker):
        return (
            (
                (
                    helpers.language_test(tracker, 5)
                    and tracker.slots.get("occupation") == "B"
                )
                or (
                    helpers.language_test(tracker, 6)
                    and tracker.slots.get("occupation") in ["0", "A"]
                )
            )
            and tracker.slots.get("work_experience_global") >= 1
            and tracker.slots.get("job_offer")
        )

    def nwt_entrepreneur(self, tracker):

        return (
            helpers.language_test(tracker, 4)
            and tracker.slots.get("net_worth") >= 250000
        )

    def nwt_eligibility(self, tracker):
        eligibility = []
        if self.nwt_express_entry(tracker):
            eligibility.append("Northwest Territories Express Entry")
        if self.nwt_critical_impact(tracker):
            eligibility.append("Northwest Territories Critical Impact Workers")
        if self.nwt_skilled_worker(tracker):
            eligibility.append("Northwest Territories Skilled Workers")
        if self.nwt_entrepreneur(tracker):
            eligibility.append("Northwest Territories Entrepreneur")
        return eligibility
