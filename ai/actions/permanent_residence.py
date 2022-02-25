from actions.alberta import AlbertaEligibility
from actions.british_columbia import BritishColumbiaEligibility
from actions.manitoba import ManitobaEligibility
from actions.new_brunswick import NewBrunswickEligibility
from actions.newfoundland_and_labrador import NewfoundlandEligibility
from actions.northwest_territories import NorthwestTerritoriesEligibility
from actions.nova_scotia import NovaScotiaEligibility
from actions.ontario import OntarioEligibility
from actions.prince_edward_island import PrinceEdwardIslandEligibility
from actions.quebec import QuebecEligibility
from actions.saskatchewan import SaskatchewanEligibilty
from actions.yukon import YukonEligibility


class PermanentResidenceEligibility:
    def calculate_move_eligibility(tracker):
        eligibility = []
        eligibility += AlbertaEligibility().ab_eligibility(tracker)
        eligibility += BritishColumbiaEligibility().bc_eligibility(tracker)
        eligibility += ManitobaEligibility().mb_eligibility(tracker)
        eligibility += NewBrunswickEligibility().nb_eligibility(tracker)
        eligibility += NewfoundlandEligibility().nl_eligibility(tracker)
        eligibility += NorthwestTerritoriesEligibility().nwt_eligibility(tracker)
        eligibility += NovaScotiaEligibility().ns_eligiblity(tracker)
        eligibility += OntarioEligibility().on_eligibility(tracker)
        eligibility += PrinceEdwardIslandEligibility().pei_eligibility(tracker)
        eligibility += QuebecEligibility().qc_eligibility(tracker)
        eligibility += SaskatchewanEligibilty().sk_eligibility(tracker)
        eligibility += YukonEligibility().yk_eligibility(tracker)
        return eligibility
