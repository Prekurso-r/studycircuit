// Original starter questions for Cambridge International Economics 9708 (2026–2028).
// The topic numbers are the main AS and A Level syllabus headings.
import { choices } from './science-practice-tools.js';

const topics = {
  1: {
    simple: [
      ['scarcity', 'Why must every economy make choices?', 'Resources are limited relative to wants', ['All goods are free', 'All wants can be satisfied', 'Money is the only scarce resource'], 'Scarcity means available resources cannot satisfy all wants, so choices are necessary.'],
      ['opportunity-cost', 'A student spends an evening working instead of attending a concert. What is the opportunity cost?', 'The benefit of attending the concert', ['The wage earned from working', 'Every activity the student could possibly do', 'The money already spent on a textbook'], 'Opportunity cost is the value of the next best alternative given up.'],
      ['normative', 'Which statement is normative?', 'The government should reduce income inequality', ['Inflation was 4% last year', 'The tax rate is 20%', 'Exports rose during the year'], 'A normative statement contains a value judgement; a positive statement can in principle be tested against evidence.'],
      ['factors', 'Which is an example of physical capital?', 'A machine used to produce bread', ['The skills of a baker', 'A field of wheat before harvest', 'The wages paid to a baker'], 'Physical capital is a manufactured resource used in production. Skills are human capital.'],
      ['ppc', 'What does a point inside a production possibility curve indicate?', 'Some resources are unemployed or inefficiently used', ['The combination is unattainable', 'All resources are fully and efficiently used', 'Wants have been fully satisfied'], 'An interior point shows that more of at least one good could be produced with existing resources.'],
    ],
    challenge: [
      ['ppc-cost', 'A factory can make either 40 bicycles or 80 scooters with its resources. Assuming a straight-line production possibility curve, what is the opportunity cost of one bicycle?', '2 scooters', ['0.5 scooters', '40 scooters', '80 scooters'], 'The trade-off is 80 scooters for 40 bicycles, or 2 scooters per bicycle.'],
      ['public-good', 'Which combination describes a pure public good?', 'Non-rival and non-excludable', ['Rival and excludable', 'Non-rival and excludable', 'Rival and non-excludable'], 'Non-rivalry means one person’s use does not reduce availability to others; non-excludability means non-payers cannot readily be excluded.'],
    ],
  },
  2: {
    simple: [
      ['demand', 'What is likely to happen to demand for a normal good when consumer incomes rise, other things equal?', 'Demand increases', ['Quantity demanded falls because its own price rises', 'Supply increases automatically', 'Demand is unchanged by definition'], 'A normal good has positive income elasticity, so a higher income shifts its demand curve to the right.'],
      ['supply', 'A fall in production costs has what likely effect, other things equal?', 'Supply increases', ['Demand increases', 'Supply decreases', 'Quantity demanded decreases along an unchanged demand curve'], 'Lower costs make production more profitable at each price, shifting supply to the right.'],
      ['equilibrium', 'A market is in equilibrium when:', 'Quantity demanded equals quantity supplied', ['All consumers can obtain the good free', 'Every producer earns the same profit', 'Demand and supply are both zero'], 'At equilibrium there is no shortage or surplus exerting pressure on price.'],
      ['ped', 'Demand is price elastic when:', 'The percentage change in quantity demanded is greater than the percentage change in price', ['Quantity demanded never changes', 'The percentage change in quantity is less than the percentage change in price', 'Price and quantity always rise together'], 'Price elasticity of demand has an absolute value greater than one when quantity is proportionately more responsive than price.'],
      ['substitutes', 'Tea and coffee are substitutes. What is the likely effect of a rise in the price of coffee on demand for tea?', 'Demand for tea rises', ['Demand for tea falls', 'Supply of tea falls automatically', 'The price of tea must fall'], 'Some consumers switch from the more expensive coffee to tea, increasing demand for tea.'],
    ],
    challenge: [
      ['ped-revenue', 'The price of a good rises by 10% and quantity demanded falls by 20%. What happens to total revenue?', 'It falls', ['It rises', 'It stays exactly the same', 'There is not enough information to calculate its direction'], 'New revenue is 1.10 × 0.80 = 0.88 of the original: a 12% fall.'],
      ['surplus', 'A buyer is willing to pay $18 for an item and pays $13. What is their consumer surplus?', '$5', ['$13', '$18', '$31'], 'Consumer surplus is willingness to pay minus the amount paid: $18 − $13 = $5.'],
    ],
  },
  3: {
    simple: [
      ['indirect-tax', 'An indirect tax on a product normally shifts its supply curve:', 'Upwards or to the left', ['Downwards or to the right', 'Only if consumer income falls', 'Not at all'], 'A tax increases the cost to suppliers of providing each unit, reducing supply at each market price.'],
      ['subsidy', 'A production subsidy is intended to:', 'Reduce producers’ costs', ['Increase the marginal cost of supply', 'Prohibit consumption', 'Eliminate all government spending'], 'A subsidy is a government payment that reduces producers’ effective costs.'],
      ['price-ceiling', 'A maximum price set below equilibrium is likely to create:', 'A shortage', ['A surplus', 'An increase in supply at that price', 'An equilibrium without adjustment'], 'At a binding maximum price, quantity demanded exceeds quantity supplied.'],
      ['merit', 'Why might a government subsidise education?', 'Individuals may underestimate its wider benefits', ['It is necessarily a pure public good', 'Its production has no opportunity cost', 'It is always over-consumed by an unregulated market'], 'Education can generate benefits beyond the individual, while imperfect information may lead to under-consumption.'],
      ['progressive', 'A progressive income tax is one where:', 'The average tax rate rises as income rises', ['Everyone pays the same amount', 'The average tax rate falls as income rises', 'Only spending is taxed'], 'Under a progressive tax, tax takes an increasing proportion of income at higher income levels.'],
    ],
    challenge: [
      ['tax-incidence', 'When demand is relatively price inelastic and supply is relatively price elastic, who is likely to bear the larger share of a per-unit tax?', 'Consumers', ['Producers only', 'The government', 'Foreign consumers only'], 'The less price-responsive side of the market generally bears the larger share of the tax burden.'],
      ['minimum-price', 'A government sets a minimum price above the equilibrium price. What is the likely result without further intervention?', 'Excess supply', ['Excess demand', 'No change in quantity supplied', 'A shortage caused by a price ceiling'], 'At the binding price floor, producers wish to supply more than consumers wish to buy.'],
    ],
  },
  4: {
    simple: [
      ['gdp', 'What does real GDP adjust for?', 'Changes in the general price level', ['Changes in the population only', 'The exchange rate only', 'All unpaid work automatically'], 'Real GDP measures output at constant prices, removing the effect of price changes.'],
      ['inflation', 'Inflation is:', 'A sustained rise in the general price level', ['A fall in every individual price', 'A rise in the value of money', 'An increase in real GDP'], 'Inflation concerns the general level of prices, not necessarily every price in an economy.'],
      ['unemployment', 'A person is unemployed under the usual labour-force measure when they:', 'Are without work, available for work and actively seeking it', ['Are retired and not seeking work', 'Choose not to seek work while studying', 'Have a full-time job'], 'Unemployment requires being without work and meeting the relevant availability and job-seeking criteria.'],
      ['ad', 'Which is a component of aggregate demand?', 'Investment spending', ['Imports added to exports', 'The unemployment rate', 'The money supply alone'], 'Aggregate demand is consumption plus investment plus government spending plus exports minus imports.'],
      ['growth', 'Economic growth is normally measured as an increase in:', 'Real output over time', ['The general price level', 'The population alone', 'The exchange rate'], 'Growth refers to an increase in real GDP or real output, rather than a price-driven rise in nominal GDP.'],
    ],
    challenge: [
      ['real-growth', 'Nominal GDP rises from 200 to 220 while the price index rises from 100 to 110. What happens to real GDP?', 'It stays unchanged', ['It rises by 10%', 'It falls by 10%', 'It rises by 20%'], 'Deflating 220 by 110/100 gives 200 in base-period prices, the same as before.'],
      ['circular-flow', 'Which is a withdrawal from the circular flow of income?', 'Saving', ['Investment', 'Government spending', 'Exports'], 'Saving is income not spent on domestic output. Investment, government spending and exports are injections.'],
    ],
  },
  5: {
    simple: [
      ['fiscal', 'Which is an example of fiscal policy?', 'Changing government spending', ['Changing the policy interest rate', 'Setting a reserve requirement', 'Changing the exchange rate through currency intervention'], 'Fiscal policy uses government spending and taxation to influence the economy.'],
      ['monetary', 'A central bank raises its policy interest rate. This is an example of:', 'Contractionary monetary policy', ['Expansionary fiscal policy', 'A production subsidy', 'A direct tax cut'], 'A higher policy rate is a monetary measure intended, other things equal, to dampen borrowing and spending.'],
      ['supply-side', 'Which policy aims to improve the productive capacity of an economy?', 'Investment in worker training', ['A temporary rise in consumer spending only', 'A higher indirect tax on all output', 'A reduction in the working population'], 'Training can improve labour productivity and the economy’s productive capacity.'],
      ['budget', 'A government budget deficit occurs when:', 'Government expenditure exceeds government revenue over a period', ['Exports exceed imports', 'The central bank raises interest rates', 'Government revenue exceeds expenditure'], 'A budget deficit is a flow: spending exceeds revenue during the relevant period.'],
      ['demand-inflation', 'Which policy could reduce demand-pull inflation, other things equal?', 'Reducing government spending', ['Increasing government spending', 'Reducing income tax', 'Reducing interest rates'], 'Lower government spending reduces aggregate demand, easing demand-side inflationary pressure.'],
    ],
    challenge: [
      ['interest-investment', 'Why might higher interest rates reduce business investment?', 'Borrowing to finance projects becomes more expensive', ['They guarantee higher expected profits', 'They eliminate all business risk', 'They directly increase government spending'], 'A higher cost of borrowing may make fewer investment projects worthwhile, although other factors also matter.'],
      ['policy-lag', 'Why may a training programme take time to reduce structural unemployment?', 'Workers need time to acquire skills and find suitable jobs', ['Training instantly changes all vacancies', 'Structural unemployment is caused only by inflation', 'Training directly removes people from the population'], 'Supply-side measures can have long implementation and adjustment lags.'],
    ],
  },
  6: {
    simple: [
      ['comparative', 'Comparative advantage is based on:', 'A lower opportunity cost of producing a good', ['The ability to produce every good with fewer resources', 'A higher selling price', 'The absence of imports'], 'A country has comparative advantage in a good when its opportunity cost is lower than that of its trading partner.'],
      ['tariff', 'A tariff is:', 'A tax on imports', ['A direct payment to exporters', 'A limit on the quantity imported', 'A fixed exchange rate'], 'A tariff raises the cost of imported goods by applying a tax.'],
      ['quota', 'An import quota is:', 'A limit on the quantity of imports', ['A tax on income', 'A subsidy to consumers', 'A measure of GDP'], 'A quota restricts the volume of a good that may be imported.'],
      ['depreciation', 'A depreciation of a currency means:', 'Its value falls relative to other currencies', ['Its value rises relative to every other currency', 'Domestic prices necessarily fall', 'Exports become more expensive in foreign currency, other things equal'], 'A depreciation is a fall in the exchange value of a currency under a floating exchange rate.'],
      ['current-account', 'Which transaction is recorded in the current account?', 'Payment for an imported service', ['Purchase of a foreign financial asset', 'A change in foreign exchange reserves', 'Purchase of shares in a foreign company'], 'Trade in goods and services, primary income and secondary income are components of the current account.'],
    ],
    challenge: [
      ['exchange-price', 'An exporter charges 50 units of its domestic currency. The exchange rate changes from 2 to 1.5 domestic units per US dollar. What is the new price in US dollars, if the domestic price is unchanged?', 'About $33.33', ['$25', '$75', '$100'], 'Divide the domestic price by domestic currency per dollar: 50 / 1.5 ≈ $33.33. The currency has appreciated against the dollar.'],
      ['trade-cost', 'Country A gives up 2 units of wheat to produce one unit of cloth; country B gives up 5 units of wheat. Which has comparative advantage in cloth?', 'Country A', ['Country B', 'Both have identical comparative advantage', 'Neither, because physical output is not stated'], 'Country A sacrifices fewer units of wheat for each unit of cloth, so its opportunity cost is lower.'],
    ],
  },
  7: {
    simple: [
      ['marginal-utility', 'Marginal utility is:', 'The additional satisfaction from consuming one more unit', ['The total amount spent', 'The cost of producing all units', 'The price of the first unit'], 'Marginal utility measures the change in total utility from an additional unit consumed.'],
      ['external-cost', 'A negative production externality occurs when:', 'Production imposes costs on third parties', ['All production costs are paid by the producer', 'Consumers receive a discount', 'A firm earns normal profit'], 'An external cost falls on someone outside the market transaction and is not reflected in private costs.'],
      ['fixed-cost', 'Which cost does not change with output in the short run?', 'Fixed cost', ['Total variable cost', 'Marginal cost', 'Total revenue'], 'Fixed costs are incurred regardless of the level of output in the short run.'],
      ['monopoly', 'A monopoly is a market with:', 'A single seller', ['A single buyer', 'Many sellers of an identical product by definition', 'No barriers to entry by definition'], 'A monopoly has one seller; a single buyer is a monopsony.'],
      ['profit', 'Economic profit equals:', 'Total revenue minus total economic cost', ['Total revenue minus fixed costs only', 'Total output multiplied by marginal cost', 'Total costs minus revenue'], 'Economic cost includes explicit costs and the opportunity cost of resources used.'],
    ],
    challenge: [
      ['profit-max', 'A firm maximises profit at an output where marginal revenue equals marginal cost, provided:', 'The equality occurs at a profit maximum rather than a minimum', ['Total revenue must be zero', 'Marginal cost must always be zero', 'Average revenue equals fixed cost'], 'MR = MC is the relevant condition at an interior maximum; the behaviour of costs and revenue must also support a maximum.'],
      ['social-cost', 'A factory has a private cost of $80 per unit and imposes an external cost of $20 per unit. What is the social cost per unit?', '$100', ['$60', '$80', '$1,600'], 'Social cost is private cost plus external cost: $80 + $20 = $100.'],
    ],
  },
  8: {
    simple: [
      ['market-failure', 'Market failure occurs when:', 'An unregulated market allocates resources inefficiently', ['Every firm earns a profit', 'A government collects tax', 'The market has any price at all'], 'Market failure means the market outcome does not achieve an efficient allocation of resources.'],
      ['pollution-tax', 'A tax on pollution is intended to make a producer:', 'Take more of the external cost into account', ['Ignore the costs imposed on others', 'Increase pollution without paying more', 'Eliminate all production costs'], 'A pollution tax can make private decision-making reflect more of the social cost.'],
      ['lorenz', 'A Lorenz curve is used to illustrate:', 'The distribution of income or wealth', ['The demand for one product', 'The relationship between price and supply', 'The exchange rate'], 'The Lorenz curve compares cumulative population shares with cumulative income or wealth shares.'],
      ['transfer', 'Which is a transfer payment?', 'An unemployment benefit', ['A government purchase of a new road', 'A firm’s spending on machinery', 'A household purchase of food'], 'A transfer redistributes income without a current good or service being supplied in return.'],
      ['wage-floor', 'A binding minimum wage is set:', 'Above the market equilibrium wage', ['Below the market equilibrium wage', 'At zero in all cases', 'At a level that cannot affect employment'], 'A wage floor below equilibrium does not constrain the market; a binding one is above it.'],
    ],
    challenge: [
      ['gini', 'A fall in the Gini coefficient, calculated on the same basis, indicates:', 'A more equal distribution', ['A less equal distribution', 'A guaranteed rise in average income', 'Zero poverty'], 'A lower Gini coefficient indicates less inequality in the measured distribution; it does not establish average income or poverty levels.'],
      ['government-failure', 'Which is an example of possible government failure?', 'A subsidy costs more than the benefit it generates', ['A tax reduces an external cost exactly to the efficient level', 'A public good is provided efficiently', 'A market has no external effects'], 'Intervention can fail if its total costs exceed the benefits or it creates significant unintended consequences.'],
    ],
  },
  9: {
    simple: [
      ['multiplier', 'The multiplier describes:', 'How an initial change in injections can lead to a larger change in national income', ['A guaranteed rise in prices only', 'A measure of population growth', 'The number of commercial banks'], 'One person’s spending becomes another’s income, creating successive rounds of spending and withdrawals.'],
      ['structural', 'Structural unemployment can arise when:', 'Workers’ skills no longer match available jobs', ['People move briefly between jobs', 'Seasonal tourism falls each winter', 'An employee takes annual leave'], 'Structural unemployment reflects a mismatch between workers and the skills or locations demanded by employers.'],
      ['money', 'Which is a function of money?', 'A medium of exchange', ['A guarantee that prices never change', 'A substitute for all productive resources', 'A measure of unemployment'], 'Money facilitates exchange by being generally accepted in payment for goods and services.'],
      ['potential-growth', 'Potential economic growth means:', 'An increase in productive capacity', ['Output rising within unchanged capacity only', 'A rise in nominal prices only', 'A decrease in the labour force'], 'Potential growth is an outward shift in the economy’s ability to produce goods and services.'],
      ['commercial-bank', 'A commercial bank typically:', 'Accepts deposits and provides loans', ['Sets all government tax rates', 'Prints all legal tender on its own authority', 'Guarantees that loans have no risk'], 'Commercial banks accept deposits and make loans, subject to regulation and risk.'],
    ],
    challenge: [
      ['multiplier-value', 'If the marginal propensity to withdraw is 0.25, what is the simple multiplier?', '4', ['0.25', '2', '5'], 'The simple multiplier is 1 / marginal propensity to withdraw, so 1 / 0.25 = 4.'],
      ['output-gap', 'An economy produces below its estimated full-capacity output. This is:', 'A negative output gap', ['A positive output gap', 'Proof that inflation is zero', 'A budget surplus'], 'A negative output gap means actual output is below potential output.'],
    ],
  },
  10: {
    simple: [
      ['trade-off', 'Why might reducing inflation with contractionary policy raise unemployment in the short run?', 'Lower aggregate demand can reduce firms’ need for labour', ['All workers immediately become more productive', 'Lower aggregate demand always creates more vacancies', 'Inflation and unemployment can never change together'], 'Weaker demand may lead firms to reduce output and employment while inflationary pressure eases.'],
      ['automatic', 'Which is an automatic stabiliser?', 'Income tax receipts falling as incomes fall', ['A newly announced change in the tax rate', 'A one-off central-bank intervention', 'An increase in tariffs voted through parliament'], 'Tax receipts can fall automatically during a downturn, cushioning the fall in disposable income without a new policy decision.'],
      ['policy-mix', 'A policy mix is:', 'The combined use of different economic policies', ['A single tax applied to one good', 'The ratio of imports to exports only', 'A fixed exchange rate by definition'], 'Governments can combine fiscal, monetary and supply-side policies to pursue several objectives.'],
      ['crowding-out', 'Crowding out can occur if government borrowing:', 'Contributes to higher interest rates and reduces private investment', ['Always creates an equal increase in private investment', 'Makes all taxes disappear', 'Prevents any government spending'], 'Additional government borrowing may put upward pressure on interest rates, although the effect depends on circumstances.'],
      ['fiscal-limit', 'Which can limit the effectiveness of expansionary fiscal policy?', 'A large share of extra spending goes on imports', ['All extra income is spent on domestic output', 'Tax revenue exists', 'The economy has a government'], 'Spending on imports is a withdrawal from domestic demand, reducing the domestic multiplier.'],
    ],
    challenge: [
      ['objective-conflict', 'Which combination could present a policy conflict?', 'Reducing unemployment rapidly while trying to reduce demand-pull inflation', ['Increasing productivity and potential output', 'Reducing the cost of production and easing cost pressure', 'Improving skills and labour mobility'], 'Boosting demand to reduce unemployment can increase inflationary pressure when spare capacity is limited.'],
      ['rate-lag', 'Why might a cut in the policy interest rate have little immediate effect?', 'Banks or borrowers may respond slowly or remain unwilling to lend and borrow', ['All borrowing rates must instantly become zero', 'Monetary policy changes taxes directly', 'Interest rates cannot influence spending'], 'Transmission depends on bank lending, expectations and households’ and firms’ willingness to borrow, and can take time.'],
    ],
  },
  11: {
    simple: [
      ['development', 'Economic development is broader than economic growth because it includes:', 'Changes in living standards and wellbeing', ['Only nominal GDP', 'Only population size', 'Only the value of exports'], 'Development considers aspects such as health, education and living standards as well as income.'],
      ['hdi', 'The Human Development Index combines indicators of:', 'Health, education and income', ['Inflation, exports and interest rates', 'Government debt, tariffs and imports', 'Population, land area and currency reserves'], 'The HDI combines life expectancy, education and income measures.'],
      ['globalisation', 'Globalisation refers to:', 'Increasing integration of economies and societies', ['The end of all trade', 'A permanent fall in all prices', 'The elimination of national governments'], 'Globalisation involves growing cross-border links through trade, investment, information and movement.'],
      ['foreign-aid', 'A grant from one government to another is:', 'An example of international aid', ['Foreign direct investment by definition', 'An import tariff', 'A depreciation'], 'A government grant can be a form of official development assistance, subject to its terms and purpose.'],
      ['fdi', 'Foreign direct investment generally involves:', 'A lasting investment and influence in an enterprise abroad', ['A tourist buying a meal overseas', 'A domestic household paying income tax', 'An economy stopping imports'], 'FDI typically involves ownership and a lasting interest in a business operating in another economy.'],
    ],
    challenge: [
      ['marshall-lerner', 'The Marshall–Lerner condition concerns whether a depreciation can improve the trade balance when:', 'The combined price elasticities of demand for exports and imports are sufficiently large', ['Exports and imports have no prices', 'The exchange rate never changes', 'Government spending equals taxation'], 'In the standard model, the sum of the absolute demand elasticities must exceed one, subject to the model’s assumptions.'],
      ['development-average', 'Why can a rise in real GDP per head be an incomplete measure of development?', 'It can hide inequality and says little directly about health or education', ['It always falls when output rises', 'It measures only the exchange rate', 'It includes every aspect of wellbeing'], 'An average can conceal distribution, while health, education and environmental outcomes are separate dimensions.'],
    ],
  },
};

export const economicsPractice = Object.entries(topics).flatMap(([topic, levels]) =>
  Object.entries(levels).flatMap(([level, rows]) => choices(`economics-${topic}`, level, rows))
);
