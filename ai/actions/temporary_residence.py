class TemporaryResidenceEligibility:
    def eta_or_visa(self, country):
        visa_exempt = [
            "Andorra",
            "Australia",
            "Austria",
            "Bahamas",
            "Barbados",
            "Belgium",
            "Brunei Darussalam",
            "Bulgaria",
            "Chile",
            "Croatia",
            "Cyprus",
            "Czech Republic",
            "Denmark",
            "Estonia",
            "Finland",
            "France",
            "Germany",
            "Greece",
            "Hong Kong",
            "Hungary",
            "lceland",
            "lreland",
            "lsrael",
            "ltaly",
            "Japan",
            "Korea (Republic of)",
            "Latvia",
            "Liechtenstein",
            "Lithuania",
            "Luxembourg",
            "Malta",
            "Mexico",
            "Monaco",
            "Netherlands",
            "New Zealand",
            "Norway",
            "Papua New Guinea",
            "Poland",
            "Portugal",
            "Samoa",
            "San Marino",
            "Singapore",
            "Slovakia",
            "Slovenia",
            "Solomon lslands",
            "Spain",
            "Sweden",
            "Switzerland",
            "Taiwan",
            "United Arab Emirates",
            "United Kingdom",
            "United States",
            "The Vatican",
        ]
        if country in visa_exempt:
            return "ETA"
        else:
            return "VISA"

    def calculate_work_eligibility(self, tracker):
        return "You may work in Canada"

    def calculate_study_eligibility(self, tracker):
        if (
            tracker.slots.get("program_length") == False
            and self.eta_or_visa(tracker.slots.get("passport_country")) == "ETA"
        ):
            return "You may study in Canada but require an eTa"
        elif (
            tracker.slots.get("program_length") == False
            and tracker.slots.get("passport_country") == "United States"
        ):
            return "You may study in Canada"
        elif tracker.slots.get("program_length") == False:
            return "You may study in Canada but require a visitor visa"
        elif tracker.slots.get("education_acceptance") == False:
            return "You require an acceptance from a designated learning institution to apply for a study permit"
        elif tracker.slots.get("education_acceptance") == True:
            return "You may apply for a study permit. Contact us for an appointment."

    def calculate_visit_eligibility(self, tracker):

        if (
            tracker.slots.get("visit_length") == True
            and tracker.slots.get("children_canada") == True
        ):
            return "You're eligible to apply for a Super Visa"
        elif (
            tracker.slots.get("visit_length") == True
            and self.eta_or_visa(tracker.slots.get("passport_country")) == "ETA"
        ):
            return "You may travel to Canada for less than 6 months using an eTa"
        elif (
            tracker.slots.get("visit_length") == True
            and tracker.slots.get("children_canada") == False
        ):
            return "You may travel to Canada for less than 6 months by applying for a visitor visa"
        elif self.eta_or_visa(tracker.slots.get("passport_country")) == "ETA":
            return "You may travel to Canada using an eTa"
        elif tracker.slots.get("passport_country") == "United States":
            return "You may travel to Canada"
        else:
            return "You may apply for a visitor visa"
