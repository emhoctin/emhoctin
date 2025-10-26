
import { Zone, LevelData } from './types';

export const LEVELS: LevelData[] = [
  { level: 1, title: 'Tân Binh', xpToNextLevel: 100 },
  { level: 2, title: 'Hạ Sĩ', xpToNextLevel: 250 },
  { level: 3, title: 'Trung Sĩ', xpToNextLevel: 500 },
  { level: 4, title: 'Thượng Sĩ', xpToNextLevel: 1000 },
  { level: 5, title: 'Chuẩn Úy', xpToNextLevel: 2000 },
];

export const ZONES: Zone[] = [
  {
    id: 'zone-1',
    name: 'Khu Vực Huấn Luyện',
    description: 'Bắt đầu hành trình của bạn tại đây, làm quen với những kiến thức cơ bản về lập trình.',
    gates: [
      {
        id: 'gate-1-1',
        name: 'Cổng Alpha: Biến và Kiểu dữ liệu',
        type: 'easy',
        questions: [
          {
            id: 'q-1-1-1',
            type: 'multiple-choice',
            text: 'Trong JavaScript, từ khóa nào được dùng để khai báo một biến có giá trị không thể thay đổi?',
            options: ['var', 'let', 'const', 'static'],
            correctOptionIndex: 2,
            explanation: '`const` được dùng để khai báo hằng số, giá trị của nó không thể được gán lại sau khi khởi tạo.',
            xp: 10,
          },
          {
            id: 'q-1-1-2',
            type: 'multiple-choice',
            text: 'Kiểu dữ liệu nào sau đây là một kiểu nguyên thủy (primitive type) trong JavaScript?',
            options: ['Object', 'Array', 'String', 'Function'],
            correctOptionIndex: 2,
            explanation: 'String là một trong các kiểu dữ liệu nguyên thủy, cùng với Number, Boolean, Null, Undefined, Symbol, và BigInt.',
            xp: 10,
          },
        ],
      },
      {
        id: 'gate-1-2',
        name: 'Cổng Beta: Hàm và Logic',
        type: 'easy',
        questions: [
           {
            id: 'q-1-2-1',
            type: 'multiple-choice',
            text: 'Đâu là cú pháp đúng để khai báo một hàm mũi tên (arrow function) trong JavaScript?',
            options: ['function myFunction() {}', 'const myFunction = () => {}', 'def myFunction():', 'function = () => {}'],
            correctOptionIndex: 1,
            explanation: '`const myFunction = () => {}` là cú pháp chính xác cho một arrow function được gán cho một biến.',
            xp: 15
          }
        ],
      },
    ],
  },
  {
    id: 'zone-2',
    name: 'Mặt Trận Thuật Toán',
    description: 'Thử thách kỹ năng giải quyết vấn đề với các thuật toán cơ bản và cấu trúc dữ liệu.',
    gates: [
      {
        id: 'gate-2-1',
        name: 'Cổng Gamma: Mảng và Vòng lặp',
        type: 'medium',
        questions: [
            {
                id: 'q-2-1-1',
                type: 'code-upload',
                text: 'Viết một hàm JavaScript nhận vào một mảng các số và trả về tổng của chúng. Tải lên một tệp `.js` chứa hàm có tên `calculateSum`.',
                code: `function calculateSum(numbers) {\n  // Viết code của bạn ở đây\n}`,
                explanation: 'Bạn cần sử dụng một vòng lặp (ví dụ: for hoặc for...of) hoặc phương thức `reduce` để duyệt qua mảng và cộng dồn các phần tử.',
                xp: 50,
            }
        ],
      },
      {
        id: 'gate-2-2',
        name: 'Cổng Delta: Thử thách Boss',
        type: 'boss',
        questions: [
          {
            id: 'q-2-2-1',
            type: 'code-upload',
            text: 'Viết một hàm JavaScript để sắp xếp một mảng các số theo thứ tự tăng dần mà không sử dụng `Array.prototype.sort()`. Tải lên tệp `.js` chứa hàm `bubbleSort`.',
            code: `function bubbleSort(arr) {\n  // Viết code của bạn ở đây\n}`,
            explanation: 'Thuật toán sắp xếp nổi bọt (Bubble Sort) là một giải pháp đơn giản. Nó lặp đi lặp lại qua danh sách, so sánh các phần tử liền kề và hoán đổi chúng nếu chúng sai thứ tự.',
            xp: 100,
          },
        ]
      }
    ]
  },
  {
    id: 'zone-3',
    name: 'Chiến Dịch API Gemini',
    description: 'Khai phá sức mạnh của AI. Tích hợp và sử dụng Gemini API để giải quyết các vấn đề phức tạp.',
    gates: [
      {
        id: 'gate-3-1',
        name: 'Cổng Epsilon: Gọi API cơ bản',
        type: 'hard',
        questions: [
          {
            id: 'q-3-1-1',
            type: 'code-upload',
            text: 'Viết một đoạn mã Node.js sử dụng `@google/genai` để gửi một câu hỏi đơn giản ("Why is the sky blue?") đến mô hình "gemini-2.5-flash" và in ra câu trả lời. Tải lên một tệp `.js`.',
            explanation: 'Bạn cần khởi tạo `GoogleGenAI` với API key, sau đó gọi `ai.models.generateContent` với tên mô hình và nội dung câu hỏi.',
            xp: 150,
          }
        ]
      }
    ]
  }
];
