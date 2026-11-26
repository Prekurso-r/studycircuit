// Original starter questions for Cambridge International Business 9609 (2026–2028).
// Quizzes reinforce knowledge and calculations; the course also needs written case-study practice.
import { choices } from './science-practice-tools.js';

const topics = {
  1: {
    simple: [
      ['enterprise', 'What is a typical role of an entrepreneur?', 'Organising resources and taking business risks', ['Guaranteeing that the business makes a profit', 'Setting all government tax rates', 'Eliminating scarcity'], 'Entrepreneurs organise factors of production and accept risk when creating or developing a business.'],
      ['added-value', 'What is added value?', 'The difference between the selling price and the cost of bought-in materials and components', ['The same as net profit', 'Total revenue minus all business costs', 'The amount borrowed by a business'], 'Added value compares selling price with bought-in input costs; other costs still need to be paid from it.'],
      ['limited-liability', 'Limited liability means owners generally:', 'Risk losing their investment, rather than being personally liable for all business debts', ['Are guaranteed a profit', 'Cannot sell their shares', 'Have no responsibility to follow the law'], 'Limited liability usually separates shareholders’ personal assets from company debts, although exceptions can apply.'],
      ['stakeholder', 'Which is an internal stakeholder of a business?', 'An employee', ['A customer', 'A local resident', 'A supplier'], 'Employees work within the business. Customers, local residents and suppliers are external stakeholders.'],
      ['objectives', 'Which is an example of a business objective?', 'Increasing market share', ['A machine used in production', 'A tax paid last year', 'A list of suppliers'], 'An objective is a target a business aims to achieve, such as growth, survival or market share.'],
    ],
    challenge: [
      ['added-value-calc', 'A bakery sells a cake for $18. Its bought-in ingredients and packaging cost $7. What is the added value per cake?', '$11', ['$7', '$18', '$25'], 'Added value is $18 − $7 = $11, before wages and other operating costs are deducted.'],
      ['stakeholder-conflict', 'A firm plans to close a factory to reduce costs. Which stakeholder conflict is most direct?', 'Owners may benefit from lower costs while employees may lose jobs', ['Employees and owners must both gain equally', 'Customers become the firm’s owners automatically', 'Suppliers are legally required to buy the factory'], 'The decision may improve profitability for owners but threaten employees’ jobs and the local community.'],
    ],
  },
  2: {
    simple: [
      ['recruitment', 'What is external recruitment?', 'Filling a vacancy with someone from outside the business', ['Promoting an existing employee', 'Removing a job description', 'Training only senior managers'], 'External recruitment seeks candidates from outside the organisation.'],
      ['training', 'On-the-job training normally takes place:', 'At the workplace while doing the job', ['Only at a university', 'Without any instruction', 'Only after the employee leaves'], 'On-the-job training takes place during work, often with guidance from an experienced employee.'],
      ['motivation', 'A financial method of motivating employees is:', 'A performance bonus', ['Job enrichment', 'Job rotation', 'Delegation'], 'A bonus provides a monetary reward linked to performance or another stated condition.'],
      ['delegation', 'Delegation involves:', 'Passing authority to a subordinate to carry out a task', ['Removing all accountability from the manager', 'Outsourcing all production', 'Stopping communication'], 'A manager can delegate authority, but remains accountable for the delegated work.'],
      ['trade-union', 'A trade union primarily represents:', 'The interests of its worker members', ['Only the shareholders', 'All customers of a business', 'Only the government'], 'Trade unions represent workers, including in negotiations with employers.'],
    ],
    challenge: [
      ['labour-turnover', 'During a year, 12 employees leave a business with an average of 120 employees. What is labour turnover?', '10%', ['1%', '12%', '120%'], 'Labour turnover is employees leaving divided by average employee numbers × 100: 12 / 120 × 100 = 10%.'],
      ['job-enrichment', 'Giving a worker more responsibility and control over how a task is done is an example of:', 'Job enrichment', ['A wage cut', 'A shorter chain of distribution', 'External recruitment'], 'Job enrichment increases the depth and responsibility of a role, potentially improving motivation.'],
    ],
  },
  3: {
    simple: [
      ['market-research', 'Primary market research collects:', 'New information for a specific purpose', ['Only data published by a government', 'Only last year’s internal accounts', 'Information that is always free'], 'Primary research gathers new data, for example through a survey designed for the business.'],
      ['segmentation', 'Market segmentation means:', 'Dividing a market into groups with similar characteristics', ['Selling one product at the same price everywhere by law', 'Combining all customers into one group', 'Stopping market research'], 'Segmentation helps a business target groups with shared needs or characteristics.'],
      ['marketing-mix', 'Which is one of the four traditional elements of the marketing mix?', 'Promotion', ['Productivity', 'Profit tax', 'Procurement policy'], 'The traditional four Ps are product, price, place and promotion.'],
      ['penetration', 'Penetration pricing usually involves:', 'Setting a low initial price to attract customers', ['Setting a high initial price to target early adopters', 'Never changing a price', 'Charging a price unrelated to customers'], 'A low initial price may encourage trial and help a product gain market share.'],
      ['product-life', 'At the maturity stage of a product life cycle, sales are generally:', 'High but growing slowly or levelling off', ['Always zero', 'Just beginning from zero', 'Certain to double every year'], 'Mature products typically have established sales, with slower growth and competitive pressure.'],
    ],
    challenge: [
      ['market-share', 'A firm sells $240,000 in a market with total sales of $1,200,000. What is its market share by value?', '20%', ['2%', '24%', '50%'], 'Market share is firm sales divided by total market sales × 100: 240,000 / 1,200,000 × 100 = 20%.'],
      ['sampling', 'Why might a small convenience sample give misleading market research results?', 'It may not represent the target market', ['A sample is automatically the entire population', 'Primary data cannot contain bias', 'A smaller sample always removes sampling error'], 'People who are easy to contact may differ systematically from the wider target market.'],
    ],
  },
  4: {
    simple: [
      ['productivity', 'Labour productivity is commonly measured as:', 'Output per worker per period', ['Total sales revenue', 'The number of managers', 'The price of a product'], 'Labour productivity relates the quantity of output to the labour input over a period.'],
      ['job-production', 'Job production is most suitable for:', 'A customised product made to a customer’s specification', ['Millions of identical cans produced continuously', 'A process with no individual orders', 'Producing only standardised units in a continuous flow'], 'Job production is used for one-off or individually tailored orders.'],
      ['capacity', 'Capacity utilisation compares actual output with:', 'Maximum possible output over the same period', ['The number of customers', 'Total revenue in the previous year', 'The value of inventory only'], 'Capacity utilisation measures what proportion of available productive capacity is being used.'],
      ['inventory', 'A buffer inventory is held mainly to:', 'Reduce the risk of running out when demand or supply is uncertain', ['Guarantee there are no storage costs', 'Replace all market research', 'Eliminate the need for suppliers'], 'Buffer inventory provides a cushion against unexpected demand or delayed deliveries, at a holding cost.'],
      ['outsourcing', 'Outsourcing means:', 'Using an external provider for an activity previously done or potentially done internally', ['Promoting an employee', 'Selling shares to existing owners only', 'Increasing production capacity within the same factory'], 'Outsourcing transfers an activity to an outside supplier, potentially changing costs, flexibility and control.'],
    ],
    challenge: [
      ['capacity-calc', 'A plant produces 720 units per week and could produce 900. What is capacity utilisation?', '80%', ['72%', '90%', '125%'], 'Capacity utilisation is actual output divided by maximum output × 100: 720 / 900 × 100 = 80%.'],
      ['inventory-tradeoff', 'What is a likely trade-off when a business holds more inventory?', 'Lower stockout risk but higher storage costs', ['Lower stockout risk and no cost of holding stock', 'No possibility of waste', 'Higher stockout risk and lower storage costs'], 'Extra inventory can protect availability but ties up cash and creates storage or obsolescence costs.'],
    ],
  },
  5: {
    simple: [
      ['cash-flow', 'A cash-flow forecast estimates:', 'Future cash inflows and outflows', ['Only accounting profit already earned', 'Only the value of machinery', 'The number of employees'], 'A cash-flow forecast estimates when money is expected to enter and leave a business.'],
      ['fixed-cost', 'Which is usually a fixed cost in the short run?', 'Factory rent', ['Raw materials per unit', 'Packaging per unit', 'A sales commission paid per unit sold'], 'A fixed cost such as rent does not change directly with output over the relevant period.'],
      ['variable-cost', 'Which is usually a variable cost?', 'Ingredients used for each unit produced', ['Annual rent under a fixed lease', 'A fixed annual insurance premium', 'Depreciation calculated as a fixed annual amount'], 'Variable costs change as output changes; more units normally require more ingredients.'],
      ['break-even', 'At break-even output:', 'Total revenue equals total cost', ['Revenue is zero', 'Every unit is sold at zero price', 'Fixed costs are zero'], 'Break-even is the output or sales level at which neither a profit nor a loss is made.'],
      ['budget', 'A budget is:', 'A financial plan for a future period', ['A record only of last year’s cash receipts', 'The same as the business’s market share', 'A legal form of ownership'], 'A budget sets planned income, expenditure or other financial targets for a defined period.'],
    ],
    challenge: [
      ['break-even-calc', 'Fixed costs are $6,000, selling price is $20 per unit and variable cost is $8 per unit. What is break-even output?', '500 units', ['300 units', '750 units', '1,000 units'], 'Contribution per unit is $20 − $8 = $12. Break-even is $6,000 / $12 = 500 units.'],
      ['cash-balance', 'Opening cash is $4,000, inflows are $6,000 and outflows are $7,500. What is the closing cash balance?', '$2,500', ['$1,500', '$4,000', '$5,500'], 'Closing cash equals opening cash plus inflows minus outflows: $4,000 + $6,000 − $7,500 = $2,500.'],
    ],
  },
  6: {
    simple: [
      ['pest', 'In a PEST analysis, a change in interest rates is mainly:', 'An economic factor', ['A technological factor', 'An internal strength', 'A production method'], 'Interest rates are part of the economic environment in which a business operates.'],
      ['swot', 'In SWOT analysis, a new overseas competitor is usually:', 'An external threat', ['An internal strength', 'An internal weakness', 'An external opportunity by definition'], 'A competitor is outside the business and may threaten sales or profits.'],
      ['csr', 'Corporate social responsibility involves:', 'Considering the social and environmental effects of business decisions', ['Ignoring all stakeholders except owners', 'Guaranteeing that a business never makes a loss', 'Avoiding every form of reporting'], 'CSR considers wider impacts on people and the environment alongside commercial objectives.'],
      ['strategy', 'A business strategy is:', 'A long-term plan for achieving major objectives', ['A record of yesterday’s receipts only', 'A single employee’s job title', 'The price of one input'], 'Strategy sets a broad direction and the means of achieving long-term business objectives.'],
      ['contingency', 'Contingency planning prepares a business to:', 'Respond to possible disruptions', ['Guarantee that disruption never occurs', 'Avoid setting objectives', 'Eliminate all business risk'], 'A contingency plan sets out responses to events such as supplier failure or a system outage.'],
    ],
    challenge: [
      ['exchange-rate', 'A domestic currency appreciates. Other things equal, what is a likely effect on a business importing components?', 'Imported components cost less in domestic currency', ['Imported components cost more in domestic currency', 'All export prices fall in foreign currency automatically', 'Domestic wages are fixed by the exchange rate'], 'An appreciation buys more foreign currency per unit of domestic currency, making a given foreign-currency import cheaper.'],
      ['decision-tree', 'A project yields $60,000 with probability 0.4 and $20,000 with probability 0.6. What is the expected revenue?', '$36,000', ['$24,000', '$32,000', '$48,000'], 'Expected revenue is 0.4 × $60,000 + 0.6 × $20,000 = $36,000, before any project cost.'],
    ],
  },
  7: {
    simple: [
      ['span', 'A manager’s span of control is:', 'The number of subordinates directly reporting to that manager', ['The number of customers in a market', 'The number of products in a portfolio', 'The time needed to produce one unit'], 'Span of control counts direct reports, not everyone in the whole organisation.'],
      ['chain', 'The chain of command describes:', 'The line of authority through an organisation', ['The route from supplier to consumer only', 'The sequence of production tasks only', 'The method of recording cash'], 'The chain of command shows how authority and responsibility pass through organisational levels.'],
      ['leadership', 'A democratic leadership style typically involves:', 'Consulting employees in decision-making', ['Making every decision without consultation', 'Avoiding all communication', 'Giving customers legal ownership'], 'Democratic leaders involve employees, although the leader may retain final responsibility.'],
      ['communication', 'A possible barrier to communication is:', 'A message using unfamiliar technical language', ['Checking that the receiver understood', 'Choosing an appropriate communication method', 'Providing a clear translation'], 'Unfamiliar jargon can prevent the receiver from understanding the intended message.'],
      ['centralisation', 'Centralised decision-making means:', 'Important decisions are concentrated near the top of the organisation', ['Every employee makes every strategic decision independently', 'There are no managers', 'All production happens in one country'], 'Centralisation refers to where decision-making authority is held, not necessarily where production is located.'],
    ],
    challenge: [
      ['flat-structure', 'A business removes a management layer. What is a possible effect?', 'Communication may be faster, but managers may have more direct reports', ['Every manager must have fewer direct reports', 'The chain of command must become longer', 'Delegation becomes impossible'], 'A flatter structure can shorten communication routes and widen managers’ spans of control.'],
      ['leadership-context', 'A factory faces an immediate safety emergency. Why might a directive leadership style be appropriate?', 'A rapid, coordinated decision may be needed', ['Consultation is never useful in any situation', 'Workers do not need safety information', 'All leadership styles produce identical outcomes'], 'The best style depends on context; urgency can make quick and clear direction valuable.'],
    ],
  },
  8: {
    simple: [
      ['elasticity', 'Demand is price elastic when:', 'Quantity demanded changes proportionately more than price', ['Quantity demanded never responds to price', 'Price never changes', 'All consumers have identical incomes'], 'The absolute value of price elasticity of demand is greater than one when demand is price elastic.'],
      ['branding', 'A strong brand can help a business:', 'Differentiate its products from competitors’ products', ['Eliminate all competition by law', 'Guarantee every new product succeeds', 'Avoid any need to consider customer needs'], 'Branding can create recognition and perceived differences, but success is not guaranteed.'],
      ['positioning', 'A market map is used to:', 'Compare products using selected customer-relevant characteristics', ['Calculate an employee’s wage', 'Record a factory’s cash balance', 'Show only the legal structure of a firm'], 'A market map positions products on axes such as price and quality to help identify competition or gaps.'],
      ['global-marketing', 'One reason to adapt marketing for an overseas market is:', 'Customer preferences and cultural expectations may differ', ['All markets have identical legal rules', 'Distribution is always free', 'Exchange rates cannot change'], 'Different tastes, culture, regulations and distribution channels can require a changed marketing mix.'],
      ['marketing-strategy', 'A marketing strategy should be consistent with:', 'The business’s objectives and target market', ['No customer research', 'Only the colour of the office', 'A guarantee that competitors never respond'], 'Marketing decisions should support overall objectives while addressing the selected market.'],
    ],
    challenge: [
      ['ped-calc', 'Price increases by 5% and quantity demanded falls by 15%. What is price elasticity of demand?', '−3', ['−0.33', '+3', '−10'], 'PED is percentage change in quantity divided by percentage change in price: −15% / 5% = −3.'],
      ['price-discrimination', 'When might charging different customer groups different prices be feasible?', 'When groups can be separated and resale is restricted', ['When everyone can freely resell between groups at no cost', 'Only when the product is always free', 'When there are no identifiable customer groups'], 'A firm needs some ability to distinguish markets and limit resale for price discrimination to be sustained.'],
    ],
  },
  9: {
    simple: [
      ['quality-control', 'Quality control focuses on:', 'Checking output against standards', ['Preventing every possible defect without checking', 'Setting tax rates', 'Recruiting shareholders'], 'Quality control detects whether output meets standards, often through inspection or testing.'],
      ['quality-assurance', 'Quality assurance focuses on:', 'Building quality into processes to prevent defects', ['Only inspecting finished products', 'Eliminating customer feedback', 'Increasing inventory regardless of cost'], 'Quality assurance aims to prevent errors through planned processes throughout production.'],
      ['economies', 'An economy of scale occurs when:', 'Average cost falls as the scale of production increases', ['Average cost rises as the scale of production increases', 'Total cost is always zero', 'Output falls to zero'], 'Economies of scale reduce long-run average cost as a business expands its scale of production.'],
      ['location', 'Which factor may influence a factory’s location?', 'Access to skilled labour and transport links', ['Only the owner’s favourite colour', 'The legal impossibility of comparing costs', 'The number of accounting periods'], 'Location decisions weigh labour, transport, markets, costs, regulation and other relevant factors.'],
      ['jit', 'Just-in-time inventory management aims to:', 'Receive materials close to when they are needed', ['Hold unlimited inventory at all times', 'Remove the need for reliable suppliers', 'Produce without any materials'], 'JIT reduces inventory holding by coordinating deliveries with production, but depends on reliable supply.'],
    ],
    challenge: [
      ['critical-path', 'A project has two independent paths: one takes 8 days and the other 11 days. What is the minimum project duration if both must finish?', '11 days', ['3 days', '8 days', '19 days'], 'The longest path determines the minimum completion time when both paths start together and must be completed.'],
      ['scale-risk', 'Why can rapid growth create diseconomies of scale?', 'Coordination and communication may become harder', ['Average costs must always keep falling', 'A larger business has no managers', 'Output can no longer be measured'], 'Beyond some scale, coordination and communication problems may increase average costs.'],
    ],
  },
  10: {
    simple: [
      ['income-statement', 'A statement of profit or loss shows:', 'Revenue and expenses over a period', ['Assets and liabilities at one date only', 'Only future cash flows', 'The firm’s organisational chart'], 'A statement of profit or loss reports revenue, expenses and profit over an accounting period.'],
      ['balance-sheet', 'A statement of financial position shows:', 'Assets, liabilities and equity at a point in time', ['Only sales over a year', 'Only future budgets', 'Only the number of units produced'], 'The statement is a snapshot of what a business owns and owes, and its equity, at a given date.'],
      ['liquidity', 'Liquidity refers to a business’s ability to:', 'Meet its short-term obligations', ['Guarantee high long-term sales', 'Remove all fixed costs', 'Increase market share every month'], 'Liquidity concerns whether the business can pay debts as they fall due in the short term.'],
      ['payback', 'The payback period is the time taken to:', 'Recover the initial cost of an investment from net cash inflows', ['Earn the highest possible accounting profit', 'Pay all employees their annual salary', 'Sell every asset'], 'Payback measures how long it takes for cumulative net cash inflows to recover the initial investment.'],
      ['depreciation', 'Depreciation is:', 'The allocation of the cost of a non-current asset over its useful life', ['An immediate cash payment in every year', 'The same as a rise in sales revenue', 'A type of share capital'], 'Depreciation spreads an asset’s depreciable amount across its useful life; it is a non-cash expense.'],
    ],
    challenge: [
      ['current-ratio', 'Current assets are $90,000 and current liabilities are $45,000. What is the current ratio?', '2:1', ['0.5:1', '1:2', '45:1'], 'Current ratio is current assets divided by current liabilities: 90,000 / 45,000 = 2.'],
      ['payback-calc', 'A project costs $60,000 and generates net cash inflows of $20,000 per year. What is its payback period?', '3 years', ['2 years', '4 years', '5 years'], 'At a constant $20,000 per year, $60,000 is recovered after three years.'],
    ],
  },
};

export const businessPractice = Object.entries(topics).flatMap(([topic, levels]) =>
  Object.entries(levels).flatMap(([level, rows]) => choices(`business-${topic}`, level, rows))
);
