document.addEventListener("DOMContentLoaded", () => {
  const calculateBtn = document.getElementById("calculateBtn");
  const amountInput = document.getElementById("amount");
  const interestInput = document.getElementById("interest");
  const yearsInput = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly");
  const totalPayment = document.getElementById("total");
  const totalInterestPayment = document.getElementById("totalInterest");

  function calculateLoan() {
    const principal = parseFloat(amountInput.value);
    const interest = parseFloat(interestInput.value) / 100 / 12;
    const time = parseFloat(yearsInput.value) * 12;

    if (isNaN(principal) || isNaN(interest) || isNaN(time) || time <= 0) {
      alert("Please Enter Valid Numbers");
      return;
    }

    const x = Math.pow(1 + interest, time);
    const monthly = (principal * interest * x) / (x - 1);

    if (isFinite(monthly)) {
      const total = monthly * time;
      const totalInterest = total - principal;

      animateValue(monthlyPayment, 0, monthly, 1000);
      animateValue(totalPayment, 0, total, 1000);
      animateValue(totalInterestPayment, 0, totalInterest, 1000);
    }
  }

  function animateValue(element, start, end, duration) {
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const value = start + (end - start) * progress;
      element.textContent = value.toFixed(2);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  calculateBtn.addEventListener("click", calculateLoan);
});
