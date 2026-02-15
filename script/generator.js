function generateFunctionCode() {
	const funcName = document.getElementById('funcName').value.trim() || 'my_function';
	const funcArgs = document.getElementById('funcArgs').value.trim();
	const funcLogic = document.getElementById('funcLogic').value.trim() || 'res = "Hello World";';
	const resultArea = document.getElementById('function-result-area');
	const codeDisplay = document.getElementById('functiongeneratedCode');

	const argList = funcArgs ? funcArgs.split(/\s+/).join(' ') : '';
	const callArgs = funcArgs ? funcArgs.split(/\s+/).map(() => '0').join(' ') : '';

	const template = `// 定義
func ${funcName}{${argList}};
  ${funcLogic}
  sendback {res};
endfunc;

// 呼叫
begin;
  result = call ${funcName}{${callArgs}};
  output {result};
end;`;
	codeDisplay.textContent = template;
	resultArea.style.display = 'block';
	showAlert('✅生成成功！');
}

function copyfunctionResult() {
	const code = document.getElementById('functiongeneratedCode').textContent;
	if (!code) return;
	
	navigator.clipboard.writeText(code).then(() => {
		// showAlert('已複製到剪貼簿！');
	});
}

function copyrequestsResult() {
	const code = document.getElementById('requestsgeneratedCode').textContent;
	if (!code) return;
	
	navigator.clipboard.writeText(code).then(() => {
		// showAlert('已複製到剪貼簿！');
		
	});
}

function toggleInputHint() {
	const method = document.getElementById('requestMethod').value;
	const label = document.getElementById('dynamicLabel');
	const hint = document.getElementById('dynamicHint');
	const bodyField = document.getElementById('requestBody');

	if (method === 'get') {
		label.innerText = '4. 查詢參數 (Params)';
		hint.innerText = '提示：GET 請求時，這些參數會自動處理為 Query String。';
		bodyField.placeholder = '例如: {"tag": "news", "limit": 5}';
	} else {
		label.innerText = '4. 傳送內容 (JSON Body)';
		hint.innerText = '提示：POST 請求時，資料將以 JSON 格式發送。';
		bodyField.placeholder = '例如: {"username": "cat", "action": "login"}';
	}
}


function generateRequestCode() {
    const urlInput = document.getElementById('requestsUrl');
    const url = urlInput.value.trim();
    const method = document.getElementById('requestMethod').value;
    const headers = document.getElementById('requestHeaders').value.trim() || '{}';
    const body = document.getElementById('requestBody').value.trim() || '{}';
    const codeDisplay = document.getElementById('requestsgeneratedCode');
    const resultArea = document.getElementById('requests-result-area');

    if (url === '') {
        if (typeof showAlert === 'function') showAlert('❌ 請輸入請求網址 (URL)！');
        urlInput.focus();
        return;
    }

    if (!url.startsWith('https://') && !url.startsWith('http://')) {
        if (typeof showAlert === 'function') showAlert('❌ 無效 URL！');
        return;
    }

    let script = `#load <requests>\n\nbegin;\n`;
    
    if (method === 'get') {
        script += `    res = requests.get{"${url}" ${headers} ${body}};\n`;
    } else {
        script += `    res = requests.post{"${url}" ${headers} ${body}};\n`;
    }
    
    script += `    output {res};\nend;`;

    codeDisplay.textContent = script;
    
    resultArea.style.display = 'block';
    setTimeout(() => {
        resultArea.classList.add('visible');
    }, 10);
    
    if (typeof showAlert === 'function') {
        showAlert('✅ 網路請求腳本已生成！');
    }
}

function showAlert(message) {
	const alertBox = document.getElementById('customAlert');
	if (!alertBox) return;

	alertBox.textContent = message;
	alertBox.style.display = 'block';

	setTimeout(() => {
		alertBox.style.display = 'none';
	}, 3000);
}