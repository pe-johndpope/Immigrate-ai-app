from actions import helpers


class QuebecEligibility:
    def qc_skilled_worker(self, tracker):
        language_test = (
            tracker.slots.get("english_test")
            and tracker.slots.get("english_speaking_score") >= 5
            and tracker.slots.get("english_listening_score") >= 5
            and tracker.slots.get("english_writing_score") >= 5
            and tracker.slots.get("english_reading_score") >= 5
            and tracker.slots.get("french_test")
            and tracker.slots.get("french_speaking_score") >= 7
            and tracker.slots.get("french_listening_score") >= 7
            and tracker.slots.get("french_writing_score") >= 7
            and tracker.slots.get("french_reading_score") >= 7
        )
        return (
            language_test
            and helpers.education(tracker) >= helpers.EducationLevels.SECONDARY
        )

    def qc_foreign_students(self, tracker):
        language_test = (
            tracker.slots.get("french_test")
            and tracker.slots.get("french_speaking_score") >= 7
            and tracker.slots.get("french_listening_score") >= 7
            and tracker.slots.get("french_writing_score") >= 7
            and tracker.slots.get("french_reading_score") >= 7
        )
        return (
            language_test
            and helpers.education(tracker) >= helpers.EducationLevels.POST_SECONDARY
        )

    def qc_investor(self, tracker):
        # including spouse
        return (
            tracker.slots.get("net_worth") >= 2000000
            and tracker.slots.get("work_experience_global") >= 2
        )

    def qc_self_employed(self, tracker):
        return (
            tracker.slots.get("net_worth") >= 100000
            and tracker.slots.get("work_experience_global") >= 2
        )

    def qc_entrepreneur_1(self, tracker):
        return True

    def qc_entrepreneur_2(self, tracker):
        return tracker.slots.get("net_worth") >= 900000

    def qc_temp_worker(self, tracker):
        language_test = (
            tracker.slots.get("french_test")
            and tracker.slots.get("french_speaking_score") >= 7
            and tracker.slots.get("french_listening_score") >= 7
            and tracker.slots.get("french_writing_score") >= 7
            and tracker.slots.get("french_reading_score") >= 7
        )
        return language_test and tracker.slots.get("work_experience_global") >= 1

    def qc_eligibility(self, tracker):
        eligibility = []
        if self.qc_skilled_worker(tracker):
            eligibility.append("Quebec Skilled Worker")
        if self.qc_foreign_students(tracker):
            eligibility.append("Quebec Foreign Students")
        if self.qc_investor(tracker):
            eligibility.append("Quebec Investor")
        if self.qc_self_employed(tracker):
            eligibility.append("Quebec Self-Employed")
        if self.qc_entrepreneur_1(tracker):
            eligibility.append("Quebec Entrepreneur Stream 1")
        if self.qc_entrepreneur_2(tracker):
            eligibility.append("Quebec Entrepreneur Stream 2")
        if self.qc_temp_worker(tracker):
            eligibility.append("Quebec Temporary Worker Stream")
        return eligibility
