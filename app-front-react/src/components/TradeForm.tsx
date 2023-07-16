import React from 'react';

const TradeForm = (props) => {
  const { handleTrade } = props; 
  return (<>
    <h2>Trade Form</h2>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const company = formData.get('company') as string;
        const amount = Number(formData.get('amount'));
        handleTrade(company, amount);
      }}
    >
      <label htmlFor="company">Company:</label>
      <select id="company" name="company">
        <option value="GOOGLE">GOOGLE</option>
        <option value="AMAZON">AMAZON</option>
      </select>
      <label style={{marginLeft : 10} } htmlFor="amount">Amount:</label>
      <input type="number" id="amount" name="amount" />
      <button style={{marginLeft : 10} } type="submit">Trade</button>
    </form>
    </>
  );
};

export default TradeForm;