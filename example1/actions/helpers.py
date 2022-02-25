from enum import Enum
from datetime import datetime, date

# OrderedEnum class makes it possible to have EducationLevels class
class OrderedEnum(Enum):
    def __ge__(self, other):
        if self.__class__ is other.__class__:
            return self.value >= other.value
        return NotImplemented

    def __gt__(self, other):
        if self.__class__ is other.__class__:
            return self.value > other.value
        return NotImplemented

    def __le__(self, other):
        if self.__class__ is other.__class__:
            return self.value <= other.value
        return NotImplemented

    def __lt__(self, other):
        if self.__class__ is other.__class__:
            return self.value < other.value
        return NotImplemented

# Enum class that allows ordering of education levels
class EducationLevels(OrderedEnum):
    SECONDARY = 0
    POST_SECONDARY = 1
    UNDERGRADUATE = 2
    GRADUATE = 3

# Returns age based on date of birth
def calculate_age(tracker):
    today = date.today()
    born = datetime.fromisoformat(tracker.slots.get("date_of_birth"))
    return today.year - born.year - ((today.month, today.day) < (born.month, born.day))

# returns EducationLevels value based on slot value
def education(tracker):
    if tracker.slots.get("education") == "secondary":
        return EducationLevels.SECONDARY
    if tracker.slots.get("education") == "postsecondary":
        return EducationLevels.POST_SECONDARY
    if tracker.slots.get("education") == "undergraduate":
        return EducationLevels.UNDERGRADUATE
    if tracker.slots.get("education") == "graduate":
        return EducationLevels.GRADUATE

# Returns true if user passes minimum_score in all areas
def language_test(tracker, minimum_score):
    return (
        tracker.slots.get("english_test")
        and tracker.slots.get("english_speaking_score") >= minimum_score
        and tracker.slots.get("english_listening_score") >= minimum_score
        and tracker.slots.get("english_writing_score") >= minimum_score
        and tracker.slots.get("english_reading_score") >= minimum_score
    ) or (
        tracker.slots.get("french_test")
        and tracker.slots.get("french_speaking_score") >= minimum_score
        and tracker.slots.get("french_listening_score") >= minimum_score
        and tracker.slots.get("french_writing_score") >= minimum_score
        and tracker.slots.get("french_reading_score") >= minimum_score
    )

# The following functions convert a language test score into a CLB score
def ielts_reading(score):
    if score >= 8:
        return 10
    elif score >= 7:
        return 9
    elif score >= 6.5:
        return 8
    elif score >= 6:
        return 7
    elif score >= 5:
        return 6
    elif score >= 4:
        return 5
    elif score >= 3.5:
        return 4
    else:
        return 0


def ielts_writing(score):
    if score >= 7.5:
        return 10
    elif score >= 7:
        return 9
    elif score >= 6.5:
        return 8
    elif score >= 6:
        return 7
    elif score >= 5.5:
        return 6
    elif score >= 5:
        return 5
    elif score >= 4:
        return 4
    else:
        return 0


def ielts_listening(score):
    if score >= 8.5:
        return 10
    elif score >= 8:
        return 9
    elif score >= 7.5:
        return 8
    elif score >= 6:
        return 7
    elif score >= 5.5:
        return 6
    elif score >= 5:
        return 5
    elif score >= 4:
        return 4
    else:
        return 0


def ielts_speaking(score):
    if score >= 7.5:
        return 10
    elif score >= 7:
        return 9
    elif score >= 6.5:
        return 8
    elif score >= 6:
        return 7
    elif score >= 5.5:
        return 6
    elif score >= 5:
        return 5
    elif score >= 4:
        return 4
    else:
        return 0


def ielts_converter(tracker):
    reading_score = ielts_reading(tracker.slots.get("english_reading_score"))
    writing_score = ielts_writing(tracker.slots.get("english_writing_score"))
    speaking_score = ielts_speaking(tracker.slots.get("english_speaking_score"))
    listening_score = ielts_listening(tracker.slots.get("english_listening_score"))


def celpip_converter(tracker):
    reading_score = tracker.slots.get("english_reading_score")
    writing_score = tracker.slots.get("english_writing_score")
    speaking_score = tracker.slots.get("english_speaking_score")
    listening_score = tracker.slots.get("english_listening_score")


def tef_reading(score):
    if score >= 263:
        return 10
    elif score >= 248:
        return 9
    elif score >= 233:
        return 8
    elif score >= 207:
        return 7
    elif score >= 181:
        return 6
    elif score >= 151:
        return 5
    elif score >= 121:
        return 4
    else:
        return 0


def tef_writing(score):
    if score >= 393:
        return 10
    elif score >= 371:
        return 9
    elif score >= 349:
        return 8
    elif score >= 310:
        return 7
    elif score >= 271:
        return 6
    elif score >= 226:
        return 5
    elif score >= 181:
        return 4
    else:
        return 0


def tef_listening(score):
    if score >= 316:
        return 10
    elif score >= 298:
        return 9
    elif score >= 280:
        return 8
    elif score >= 249:
        return 7
    elif score >= 217:
        return 6
    elif score >= 181:
        return 5
    elif score >= 145:
        return 4
    else:
        return 0


def tef_speaking(score):
    if score >= 393:
        return 10
    elif score >= 371:
        return 9
    elif score >= 349:
        return 8
    elif score >= 310:
        return 7
    elif score >= 271:
        return 6
    elif score >= 226:
        return 5
    elif score >= 181:
        return 4
    else:
        return 0


def tef_converter(tracker):
    reading_score = tef_reading(tracker.slots.get("english_reading_score"))
    writing_score = tef_writing(tracker.slots.get("english_writing_score"))
    speaking_score = tef_speaking(tracker.slots.get("english_speaking_score"))
    listening_score = tef_listening(tracker.slots.get("english_listening_score"))


def tcf_reading(score):
    if score >= 549:
        return 10
    elif score >= 524:
        return 9
    elif score >= 499:
        return 8
    elif score >= 453:
        return 7
    elif score >= 406:
        return 6
    elif score >= 375:
        return 5
    elif score >= 342:
        return 4
    else:
        return 0


def tcf_writing(score):
    if score >= 16:
        return 10
    elif score >= 14:
        return 9
    elif score >= 12:
        return 8
    elif score >= 10:
        return 7
    elif score >= 7:
        return 6
    elif score >= 6:
        return 5
    elif score >= 4:
        return 4
    else:
        return 0


def tcf_listening(score):
    if score >= 549:
        return 10
    elif score >= 523:
        return 9
    elif score >= 503:
        return 8
    elif score >= 458:
        return 7
    elif score >= 398:
        return 6
    elif score >= 369:
        return 5
    elif score >= 331:
        return 4
    else:
        return 0


def tcf_speaking(score):
    if score >= 16:
        return 10
    elif score >= 14:
        return 9
    elif score >= 12:
        return 8
    elif score >= 10:
        return 7
    elif score >= 7:
        return 6
    elif score >= 6:
        return 5
    elif score >= 4:
        return 4
    else:
        return 0


def tcf_converter(tracker):
    reading_score = tcf_reading(tracker.slots.get("english_reading_score"))
    writing_score = tcf_writing(tracker.slots.get("english_writing_score"))
    speaking_score = tcf_speaking(tracker.slots.get("english_speaking_score"))
    listening_score = tcf_listening(tracker.slots.get("english_listening_score"))

# Returns true if they meet the requirements for at least one federal program
# TODO: bug involving circular import
def federal_program(tracker):
    return True
    # return (
    #     FederalEligibility().federal_skilled_worker(tracker)
    #     or FederalEligibility().federal_skilled_trade(tracker)
    #     or FederalEligibility().canada_experience_class(tracker)
    # )
