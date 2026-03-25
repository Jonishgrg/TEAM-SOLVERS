export default function FinancialHelp() {
  const programs = [
    { name: 'Agri Loan', rate: '7%', amount: '₹ 5,00,000', tenure: '7 years' },
    { name: 'Crop Subsidy', rate: 'Grant', amount: '₹ 1,00,000', tenure: 'N/A' },
    { name: 'Equipment Finance', rate: '6.5%', amount: '₹ 10,00,000', tenure: '10 years' },
    { name: 'Farm Development', rate: '5%', amount: '₹ 3,00,000', tenure: '5 years' },
    { name: 'Organic Certification', rate: 'Grant', amount: '₹ 50,000', tenure: 'N/A' },
    { name: 'Insurance Scheme', rate: 'Premium', amount: '₹ 30 per hundred', tenure: '1 year' },
  ]

  return (
    <div className="financial-help-page">
      <h1>Financial Assistance & Loans</h1>
      <p>Government and private schemes for farmers</p>

      <div className="programs-grid">
        {programs.map((program, idx) => (
          <div key={idx} className="program-card">
            <h3>{program.name}</h3>
            <p>Amount: {program.amount}</p>
            <p>Rate: {program.rate}</p>
            <p>Tenure: {program.tenure}</p>
            <button className="btn-primary">Apply Now</button>
          </div>
        ))}
      </div>

      <div className="contact-info">
        <h2>Need Help?</h2>
        <p>Contact our financial advisors:</p>
        <p>📞 +977-1-5555555</p>
        <p>📧 finance@agro-connect.com</p>
      </div>
    </div>
  )
}
