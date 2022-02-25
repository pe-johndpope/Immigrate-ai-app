from actions import helpers


class ManitobaEligibility:
    # work experience must be in Manitoba
    def mb_work_experience(self, tracker):
        return (
            helpers.language_test(tracker, 4)
            and tracker.slots.get("occupation") in ["C", "D"]
        ) or (
            helpers.language_test(tracker, 5)
            and tracker.slots.get("occupation") in ["0", "A", "B"]
        )

    def mb_direct_recruitment(self, tracker):
        return (
            tracker.slots.get("job_offer")
            and 21 <= helpers.calculate_age(tracker) <= 45
            and (
                (
                    helpers.language_test(tracker, 4)
                    and tracker.slots.get("occupation") in ["C", "D"]
                )
                or (
                    helpers.language_test(tracker, 5)
                    and tracker.slots.get("occupation") in ["0", "A", "B"]
                )
            )
        )

    def mb_express_entry(self, tracker):
        return (
            (
                helpers.language_test(tracker, 6)
                and tracker.slots.get("occupation") == "B"
            )
            or (
                helpers.language_test(tracker, 7)
                and tracker.slots.get("occupation") in ["0", "A"]
            )
        ) and helpers.education(tracker) >= helpers.EducationLevels.POST_SECONDARY

    def mb_human_capital(self, tracker):
        return (
            helpers.language_test(tracker, 5)
            and helpers.education(tracker) >= helpers.EducationLevels.POST_SECONDARY
        )

    # post secondary in manitoba
    def mb_career_employment(self, tracker):
        return (
            helpers.language_test(tracker, 7)
            and helpers.education(tracker) >= helpers.EducationLevels.POST_SECONDARY
            and tracker.slots.get("job_offer")
        )

    def mb_graduate_internship(self, tracker):
        return (
            helpers.language_test(tracker, 7)
            and helpers.education(tracker) >= helpers.EducationLevels.GRADUATE
        )

    def mb_student_entrepreneur(self, tracker):
        return (
            21 <= helpers.calculate_age(tracker) <= 35
            and helpers.education(tracker) >= helpers.EducationLevels.POST_SECONDARY
            and tracker.slots.get("work_permit")
            and helpers.language_test(tracker, 7)
        )

    def mb_entrepreneur(self, tracker):
        return (
            tracker.slots.get("net_worth") >= 500000
            and helpers.language_test(tracker, 5)
            and helpers.education(tracker) >= helpers.EducationLevels.SECONDARY
            and tracker.slots.get("work_experience_global") >= 3
        )

    def mb_farm_investor(self, tracker):
        return tracker.slots.get("net_worth") >= 500000 and tracker.slots.get("farmer")

    def mb_eligibility(self, tracker):
        eligibility = []
        if self.mb_work_experience(tracker):
            eligibility.append("Manitoba Work Experience Pathway")
        if self.mb_direct_recruitment(tracker):
            eligibility.append("Manitoba Employer Direct Recruitment Pathway")
        if self.mb_express_entry(tracker):
            eligibility.append("Manitoba Express Entry Pathway")
        if self.mb_human_capital(tracker):
            eligibility.append("Manitoba Human Capital Pathway")
        if self.mb_career_employment(tracker):
            eligibility.append("Manitoba Career Employment Pathway")
        if self.mb_graduate_internship(tracker):
            eligibility.append("Manitoba Graduate Internship Pathway")
        if self.mb_student_entrepreneur(tracker):
            eligibility.append("Manitoba Student Entrepreneur Pathway")
        if self.mb_entrepreneur(tracker):
            eligibility.append("Manitoba Entrepreneur Pathway")
        if self.mb_farm_investor(tracker):
            eligibility.append("Manitoba Farm Investor Pathway")
        return eligibility
