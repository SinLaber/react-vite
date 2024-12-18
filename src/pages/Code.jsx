import React, { useEffect, useRef } from 'react';
import '../styles/Code.css';
import * as Blockly from 'blockly';
import { blocks } from './blocks/text';  // 你的自定义积木块
import { forBlock } from './blocks/javascript';  // 生成代码的规则
import { javascriptGenerator } from 'blockly/javascript';  // 生成 JavaScript 代码
import { save, load } from './blocks/serialization';  // 保存和加载工作区的状态
import { toolbox } from './blocks/toolbox';  // 自定义工具箱

function Code() {
    const blocklyDivRef = useRef(null); // 用于获取 Blockly 容器的引用
    const generatedCodeRef = useRef(null); // 用于获取 generatedCode 元素的引用
    const outputDivRef = useRef(null); // 用于获取 output 元素的引用

    useEffect(() => {
        // 仅在挂载时执行一次
        const blocklyDiv = blocklyDivRef.current;

        if (!blocklyDiv) return;

        // 注册 Blockly 自定义积木块
        Blockly.common.defineBlocks(blocks);
        Object.assign(javascriptGenerator.forBlock, forBlock);

        // 初始化 Blockly 编辑器
        const ws = Blockly.inject(blocklyDiv, { toolbox });

        const runCode = () => {
            const code = javascriptGenerator.workspaceToCode(ws);
            if (generatedCodeRef.current) {
                generatedCodeRef.current.textContent = code;  // 更新 generatedCode 内容
            }
            if (outputDivRef.current) {
                outputDivRef.current.innerHTML = '';  // 清空输出面板
            }

            try {
                // 重定向 console.log 到 output 部分
                const output = (msg) => {
                    if (outputDivRef.current) {
                        outputDivRef.current.innerHTML += msg + "<br>"; // 将日志显示到 output 中
                    }
                };

                // 将 console.log 替换为输出到 output 部分
                const originalConsoleLog = console.log;
                console.log = output;

                // 执行代码
                eval(code);

                // 恢复原始的 console.log
                console.log = originalConsoleLog;
            } catch (error) {
                console.error('Error running code:', error);
                if (outputDivRef.current) {
                    outputDivRef.current.innerHTML = "Error: " + error.message;  // 输出错误信息
                }
            }
        };

        if (ws) {
            load(ws);  // 加载工作区的初始状态并执行代码
            runCode();

            // 每次工作区状态变化时保存状态
            ws.addChangeListener((e) => {
                if (e.isUiEvent) return;
                save(ws);  // 保存工作区状态
            });

            // 每次工作区更改时重新执行代码
            ws.addChangeListener((e) => {
                if (e.isUiEvent || e.type === Blockly.Events.FINISHED_LOADING || ws.isDragging()) {
                    return;
                }
                runCode();
            });
        }

    }, []); // 确保只执行一次

    return (
        <div id="codeContainer">
            <div id="blocklyDiv" ref={blocklyDivRef}></div>
            <div id="outputPane">
                <pre id="generatedCode" ref={generatedCodeRef}>Generated Code</pre>
                <div id="output" ref={outputDivRef}>Output</div>
            </div>
            {/*<button onClick={runCode}>运行代码</button> /!* 添加按钮 *!/*/}
        </div>
    );
}

export default Code;
