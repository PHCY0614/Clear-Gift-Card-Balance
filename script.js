document.addEventListener('DOMContentLoaded', function() {
    const balanceInput = document.getElementById('balance');
    const feeInput = document.getElementById('fee');
    const clearBtn = document.getElementById('clearBtn');
    const resultAmountSpan = document.getElementById('resultAmount');
    const liveAmountSpan = document.getElementById('liveAmount');
    const liveFeeSpan = document.getElementById('liveFee');
    const liveTotalSpan = document.getElementById('liveTotal');

    function updateCalculations() {
        // 取得使用者輸入的值
        const balance = parseFloat(balanceInput.value);
        const fee = parseFloat(feeInput.value);

        // 如果輸入無效，清空所有顯示內容並返回
        if (isNaN(balance) || isNaN(fee) || balance <= 0 || fee < 0) {
            resultAmountSpan.textContent = '';
            liveAmountSpan.textContent = '';
            liveFeeSpan.textContent = '';
            liveTotalSpan.textContent = '';
            return;
        }

        // 主要計算：你應該刷的金額
        const amountToPay = balance / (1 + fee / 100);
        
        // 實時計算：手續費與總數
        const feeAmount = amountToPay * (fee / 100);
        const totalAmount = amountToPay + feeAmount;

        // 更新頁面顯示
        liveAmountSpan.textContent = `$${amountToPay.toFixed(2)}`;
        liveFeeSpan.textContent = `$${feeAmount.toFixed(2)}`;
        liveTotalSpan.textContent = `$${totalAmount.toFixed(2)}`;
        resultAmountSpan.textContent = `$${amountToPay.toFixed(2)}`;
    }

    // 監聽兩個輸入框的變化，當內容有變動時立即執行計算
    balanceInput.addEventListener('input', updateCalculations);
    feeInput.addEventListener('input', updateCalculations);

    // 清除按鈕功能
    clearBtn.addEventListener('click', function() {
        balanceInput.value = '';
        feeInput.value = '';
        updateCalculations(); // 清空顯示的數值
        balanceInput.focus(); // 清除後將游標重新定位到第一個輸入框
    });
});