from actions import helpers


class FederalEligibility:
    def federal_skilled_worker(self, tracker):
        return (
            helpers.language_test(tracker, 7)
            and tracker.slots.get("work_experience_global") >= 1
            and helpers.education(tracker) >= helpers.EducationLevels.SECONDARY
            and tracker.slots.get("occupation") in ["A", "B", "0"]
        )

    # need to check noc code
    def federal_skilled_trade(self, tracker):
        language_test = (
            tracker.slots.get("english_test")
            and tracker.slots.get("english_speaking_score") >= 5
            and tracker.slots.get("english_listening_score") >= 5
            and tracker.slots.get("english_writing_score") >= 4
            and tracker.slots.get("english_reading_score") >= 4
        ) or (
            tracker.slots.get("french_test")
            and tracker.slots.get("french_speaking_score") >= 5
            and tracker.slots.get("french_listening_score") >= 5
            and tracker.slots.get("french_writing_score") >= 4
            and tracker.slots.get("french_reading_score") >= 4
        )
        return (
            language_test == True
            and tracker.slots.get("skilled_trade")
            and (
                tracker.slots.get("job_offer") == True
                or tracker.slots.get("certified_skill_trade") == True
            )
            and tracker.slots.get("work_experience_global") >= 2
        )

    # ask noc specifically for cec to check language skills
    def canada_experience_class(self, tracker):
        return (
            (
                helpers.language_test(tracker, 5)
                and tracker.slots.get("occupation") == "B"
            )
            or (
                helpers.language_test(tracker, 7)
                and tracker.slots.get("occupation") in ["A", "B"]
            )
        ) and tracker.slots.get("work_experience_canada") >= 1

    def startup_visa(self, tracker):
        return helpers.language_test(tracker, 5)

    def federal_eligibility(self, tracker):
        eligibility = []
        if self.federal_skilled_worker(tracker):
            eligibility.append("Federal Skilled Worker Program")
        if self.federal_skilled_trade(tracker):
            eligibility.append("Federal Skilled Trade Program")
        if self.canada_experience_class(tracker):
            eligibility.append("Canada Experience Class")
        if self.startup_visa(tracker):
            eligibility.append("Startup Visa")
        return eligibility
