// 卖出收益计算器功能
function calculateProfit() {
    // 显示等待状态
    const sellStepsElement = document.getElementById('sellSteps');
    sellStepsElement.innerHTML = '<div class="waiting">计算中，请稍候...</div>';
    
    // 获取输入值
    const position = parseFloat(document.getElementById('position').value);
    const costPrice = parseFloat(document.getElementById('costPrice').value);
    const initialPrice = parseFloat(document.getElementById('initialPrice').value);
    const sellInterval = parseFloat(document.getElementById('sellInterval').value);
    const sellAmount = parseFloat(document.getElementById('sellAmount').value);
    
    // 验证输入
    if (!position || !costPrice || !initialPrice || !sellInterval || !sellAmount) {
        sellStepsElement.innerHTML = '<div class="placeholder">请填写所有必填字段</div>';
        alert('请填写所有必填字段');
        return;
    }
    
    if (sellAmount > position) {
        sellStepsElement.innerHTML = '<div class="placeholder">每次卖出数量不能超过持仓数量</div>';
        alert('每次卖出数量不能超过持仓数量');
        return;
    }
    
    // 计算卖出步骤和总收益
    let currentPrice = initialPrice;
    let remainingPosition = position;
    let totalRevenue = 0;
    let totalCost = position * costPrice;
    let step = 1;
    let sellStepsHTML = '';
    
    while (remainingPosition > 0) {
        const sellQty = Math.min(sellAmount, remainingPosition);
        const revenue = sellQty * currentPrice;
        totalRevenue += revenue;
        remainingPosition -= sellQty;
        
        // 添加卖出步骤到HTML
        sellStepsHTML += `
            <div class="step-item">
                <span class="step-number">第${step}次卖出</span>
                <span>价格: ${currentPrice.toFixed(2)}元 × ${sellQty}股 = ${revenue.toFixed(2)}元 | 剩余: ${remainingPosition}股</span>
            </div>
        `;
        
        currentPrice += sellInterval;
        step++;
        
        if (remainingPosition <= 0) break;
    }
    
    // 计算总收益和收益率
    const totalProfit = totalRevenue - totalCost;
    const profitPercent = ((totalProfit / totalCost) * 100).toFixed(2);
    
    // 显示结果
    document.getElementById('totalProfit').textContent = `+${totalProfit.toFixed(2)}元`;
    document.getElementById('profitPercent').textContent = `收益率: ${profitPercent}%`;
    document.getElementById('sellSteps').innerHTML = sellStepsHTML;
    
    // 高亮显示结果卡片
    const resultCard = document.getElementById('resultCard');
    resultCard.style.animation = 'none';
    setTimeout(() => {
        resultCard.style.animation = 'pulse 0.5s ease-in-out';
    }, 10);
}

// 添加键盘事件支持
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        calculateProfit();
    }
});

// 输入框自动聚焦和验证
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.select();
        });
        
        // 实时计算（可选）
        input.addEventListener('input', function() {
            // 可以在这里添加实时计算逻辑
        });
    });
});

// 添加脉冲动画（如果CSS中还没有）
if (!document.querySelector('style[data-pulse-animation]')) {
    const style = document.createElement('style');
    style.setAttribute('data-pulse-animation', 'true');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}