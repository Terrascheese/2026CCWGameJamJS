(function(ext) {
    // 扩展描述
    var descriptor = {
        blocks: [
            ['r', '从文本 %s 读取第 %n 行', 'readSpecificLine']
        ],
        menus: {},
        url: 'https://example.com/line-reader'
    };

    // 清理函数
    ext._shutdown = function() {
        // 无需特殊清理
    };

    // 扩展状态
    ext._getStatus = function() {
        return {status: 2, msg: '准备就绪'};
    };

    // 核心功能：从指定文本读取指定行
    ext.readSpecificLine = function(text, lineNumber) {
        try {
            // 验证输入
            if (!text || typeof text !== 'string') {
                return ''; // 如果没有文本，返回空
            }
            
            // 确保行号是整数且大于0
            lineNumber = Math.floor(Math.abs(lineNumber));
            if (lineNumber < 1) lineNumber = 1;
            
            // 分割文本为行（支持Windows和Unix换行符）
            var lines = text.split(/\r?\n/);
            
            // 检查行号是否有效
            if (lineNumber > lines.length) {
                return ''; // 行号超出范围，返回空字符串
            }
            
            // 返回指定行（数组索引从0开始）
            return lines[lineNumber - 1];
        } catch (error) {
            console.error('读取行时出错:', error);
            return '';
        }
    };

    // 可选：也提供固定行的快捷方法
    ext.readLine1 = function(text) {
        return ext.readSpecificLine(text, 1);
    };
    
    ext.readLine2 = function(text) {
        return ext.readSpecificLine(text, 2);
    };
    
    ext.readLine3 = function(text) {
        return ext.readSpecificLine(text, 3);
    };

    // 注册扩展
    ScratchExtensions.register('文本行读取器', descriptor, ext);
})({});
