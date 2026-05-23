#!/bin/bash
set -e

echo "========================================"
echo "Deploying all SaaS products to Vercel..."
echo "========================================"

echo "Deploying: FDARecallAlert (fdarecallalert)"
npx vercel --prod --yes --name fdarecallalert --cwd /Users/richardkamolvathin/saas-products/fdarecallalert 2>&1 | tail -1
echo ""
sleep 5

echo "Deploying: EmergencyLeads — Fire (emergencyleads-fire)"
npx vercel --prod --yes --name emergencyleads-fire --cwd /Users/richardkamolvathin/saas-products/emergencyleads-fire 2>&1 | tail -1
echo ""
sleep 5

echo "Deploying: LienAlert — Mechanics (lienalert-mechanics)"
npx vercel --prod --yes --name lienalert-mechanics --cwd /Users/richardkamolvathin/saas-products/lienalert-mechanics 2>&1 | tail -1
echo ""
sleep 5

echo "Deploying: PriceTransparency Intel (pricetransparency-intel)"
npx vercel --prod --yes --name pricetransparency-intel --cwd /Users/richardkamolvathin/saas-products/pricetransparency-intel 2>&1 | tail -1
echo ""
sleep 5

echo "Deploying: ESGScoreCard (esgscorecard)"
npx vercel --prod --yes --name esgscorecard --cwd /Users/richardkamolvathin/saas-products/esgscorecard 2>&1 | tail -1
echo ""
sleep 5

echo "Deploying: CourtFilingAlerts — Fed (courtfilingalerts-fed)"
npx vercel --prod --yes --name courtfilingalerts-fed --cwd /Users/richardkamolvathin/saas-products/courtfilingalerts-fed 2>&1 | tail -1
echo ""
sleep 5

echo "Deploying: GovContract Intel — Fed (govcontract-intel-fed)"
npx vercel --prod --yes --name govcontract-intel-fed --cwd /Users/richardkamolvathin/saas-products/govcontract-intel-fed 2>&1 | tail -1
echo ""
sleep 5

echo "Deploying: SECFilingIntel (secfilingintel)"
npx vercel --prod --yes --name secfilingintel --cwd /Users/richardkamolvathin/saas-products/secfilingintel 2>&1 | tail -1
echo ""
sleep 5

echo "Deploying: MunicipalBondAlert (municipalbondalert)"
npx vercel --prod --yes --name municipalbondalert --cwd /Users/richardkamolvathin/saas-products/municipalbondalert 2>&1 | tail -1
echo ""
sleep 5

echo "Deploying: ClinicalTrialPulse (clinicaltrialpulse)"
npx vercel --prod --yes --name clinicaltrialpulse --cwd /Users/richardkamolvathin/saas-products/clinicaltrialpulse 2>&1 | tail -1
echo ""
sleep 5

echo "Deploying: BankruptcyEarlyAlert (bankruptcyearlyalert)"
npx vercel --prod --yes --name bankruptcyearlyalert --cwd /Users/richardkamolvathin/saas-products/bankruptcyearlyalert 2>&1 | tail -1
echo ""
sleep 5

echo "Deploying: H1B Visa Intel (h1b-visa-intel)"
npx vercel --prod --yes --name h1b-visa-intel --cwd /Users/richardkamolvathin/saas-products/h1b-visa-intel 2>&1 | tail -1
echo ""
sleep 5

echo "Deploying: LayoffWatch (layoffwatch)"
npx vercel --prod --yes --name layoffwatch --cwd /Users/richardkamolvathin/saas-products/layoffwatch 2>&1 | tail -1
echo ""
sleep 5

echo "Deploying: WageTransparency Scraper (wagetransparency-scraper)"
npx vercel --prod --yes --name wagetransparency-scraper --cwd /Users/richardkamolvathin/saas-products/wagetransparency-scraper 2>&1 | tail -1
echo ""
sleep 5

echo "Deploying: PermitPulse — Solar (permitpulse-solar)"
npx vercel --prod --yes --name permitpulse-solar --cwd /Users/richardkamolvathin/saas-products/permitpulse-solar 2>&1 | tail -1
echo ""
sleep 5

echo "Deploying: PermitPulse — HVAC (permitpulse-hvac)"
npx vercel --prod --yes --name permitpulse-hvac --cwd /Users/richardkamolvathin/saas-products/permitpulse-hvac 2>&1 | tail -1
echo ""
sleep 5

echo "Deploying: ForeclosurePulse (foreclosurepulse)"
npx vercel --prod --yes --name foreclosurepulse --cwd /Users/richardkamolvathin/saas-products/foreclosurepulse 2>&1 | tail -1
echo ""
sleep 5

echo "Deploying: LienAlert — Tax (lienalert-tax)"
npx vercel --prod --yes --name lienalert-tax --cwd /Users/richardkamolvathin/saas-products/lienalert-tax 2>&1 | tail -1
echo ""
sleep 5

echo "Deploying: OSHAFineAlert (oshafinealert)"
npx vercel --prod --yes --name oshafinealert --cwd /Users/richardkamolvathin/saas-products/oshafinealert 2>&1 | tail -1
echo ""
sleep 5

echo "Deploying: EPAViolationWatch (epaviolationwatch)"
npx vercel --prod --yes --name epaviolationwatch --cwd /Users/richardkamolvathin/saas-products/epaviolationwatch 2>&1 | tail -1
echo ""
sleep 5

echo "Deploying: DebarmentAlerts (debarmentalerts)"
npx vercel --prod --yes --name debarmentalerts --cwd /Users/richardkamolvathin/saas-products/debarmentalerts 2>&1 | tail -1
echo ""
sleep 5

echo "Deploying: UCC Filing Monitor (ucc-filing-monitor)"
npx vercel --prod --yes --name ucc-filing-monitor --cwd /Users/richardkamolvathin/saas-products/ucc-filing-monitor 2>&1 | tail -1
echo ""
sleep 5

echo "Deploying: FoodSafetyPulse (foodsafetypulse)"
npx vercel --prod --yes --name foodsafetypulse --cwd /Users/richardkamolvathin/saas-products/foodsafetypulse 2>&1 | tail -1
echo ""
sleep 5

echo "Deploying: MedDeviceAlert (meddevicealert)"
npx vercel --prod --yes --name meddevicealert --cwd /Users/richardkamolvathin/saas-products/meddevicealert 2>&1 | tail -1
echo ""
sleep 5

echo "Deploying: ZoningChange Alerts (zoningchange-alerts)"
npx vercel --prod --yes --name zoningchange-alerts --cwd /Users/richardkamolvathin/saas-products/zoningchange-alerts 2>&1 | tail -1
echo ""
sleep 5

echo "Deploying: PublicDomainPrints — Space (publicdomainprints-space)"
npx vercel --prod --yes --name publicdomainprints-space --cwd /Users/richardkamolvathin/saas-products/publicdomainprints-space 2>&1 | tail -1
echo ""
sleep 5

echo "Deploying: AstronomyPrints (astronomyprints)"
npx vercel --prod --yes --name astronomyprints --cwd /Users/richardkamolvathin/saas-products/astronomyprints 2>&1 | tail -1
echo ""
sleep 5

echo "Deploying: GovContract Intel — State (govcontract-intel-state)"
npx vercel --prod --yes --name govcontract-intel-state --cwd /Users/richardkamolvathin/saas-products/govcontract-intel-state 2>&1 | tail -1
echo ""
sleep 5

echo "Deploying: PhysicianSanction Feed (physiciansanction-feed)"
npx vercel --prod --yes --name physiciansanction-feed --cwd /Users/richardkamolvathin/saas-products/physiciansanction-feed 2>&1 | tail -1
echo ""
sleep 5

echo "Deploying: ClassActionFeed (classactionfeed)"
npx vercel --prod --yes --name classactionfeed --cwd /Users/richardkamolvathin/saas-products/classactionfeed 2>&1 | tail -1
echo ""
sleep 5

echo "========================================"
echo "All deployments complete!"
echo "========================================"
