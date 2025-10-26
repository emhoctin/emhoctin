
import { Zone, GameState, LevelData } from './types';

export const ZONES_DATA: { zones: Zone[]; levels: LevelData[] } = {
  levels: [
    { level: 1, title: "Tân Binh Mạng", xpToNextLevel: 100 },
    { level: 2, title: "Kỹ Sư Tập Sự", xpToNextLevel: 250 },
    { level: 3, title: "Chuyên Gia Gỡ Lỗi", xpToNextLevel: 500 },
    { level: 4, title: "Kiến Trúc Sư Hệ Thống", xpToNextLevel: 1000 },
    { level: 5, title: "Bậc Thầy Mạng Lưới", xpToNextLevel: 9999 },
  ],
  zones: [
    {
      id: 'zone1',
      name: 'Vùng Dữ Liệu: Nhập Môn',
      description: 'Khái niệm cơ bản về Tin học và máy tính.',
      gates: [
        {
          id: 'gate1_1',
          name: 'Cổng Mạng 1: Data Scan',
          type: 'easy',
          questions: [
            { text: "CPU là viết tắt của từ gì?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Power Unit", "Control Process Unit"], correctAnswerIndex: 0, explanation: "CPU (Central Processing Unit) là bộ xử lý trung tâm, được coi là bộ não của máy tính." },
            { text: "Thiết bị nào sau đây là thiết bị nhập?", options: ["Màn hình", "Loa", "Máy in", "Bàn phím"], correctAnswerIndex: 3, explanation: "Bàn phím là thiết bị nhập (input device) dùng để đưa dữ liệu vào máy tính." },
            { text: "1 Kilobyte (KB) bằng bao nhiêu Bytes?", options: ["1000 Bytes", "1024 Bytes", "100 Bytes", "2048 Bytes"], correctAnswerIndex: 1, explanation: "Trong hệ nhị phân, 1 KB bằng 1024 Bytes (2^10 Bytes)." },
          ],
        },
        {
          id: 'gate1_2',
          name: 'Cổng Mạng 2: Logic Debug',
          type: 'medium',
          questions: [
            { text: "RAM là loại bộ nhớ gì?", options: ["Bộ nhớ chỉ đọc", "Bộ nhớ truy cập ngẫu nhiên", "Bộ nhớ ngoài", "Bộ nhớ cache"], correctAnswerIndex: 1, explanation: "RAM (Random Access Memory) là bộ nhớ truy cập ngẫu nhiên, dữ liệu sẽ mất khi mất điện." },
            { text: "Phần mềm nào dùng để duyệt web?", options: ["Microsoft Word", "Google Chrome", "Adobe Photoshop", "WinRAR"], correctAnswerIndex: 1, explanation: "Google Chrome là một trình duyệt web phổ biến." },
          ],
        },
        {
          id: 'gate1_3',
          name: 'Boss: Malware Tin Tặc',
          type: 'boss',
          questions: [
            { text: "Hệ điều hành là gì?", options: ["Một phần mềm ứng dụng", "Phần mềm hệ thống quản lý phần cứng và phần mềm", "Một thiết bị phần cứng", "Một loại virus"], correctAnswerIndex: 1, explanation: "Hệ điều hành là phần mềm hệ thống cốt lõi quản lý mọi tài nguyên của máy tính." },
            { text: "Đâu là một ví dụ về phần mềm độc hại (malware)?", options: ["Hệ điều hành Windows", "Trình duyệt Firefox", "Trojan Horse", "Phần mềm diệt virus"], correctAnswerIndex: 2, explanation: "Trojan Horse là một loại malware giả dạng phần mềm hợp pháp để xâm nhập vào hệ thống." },
            { text: "Đuôi tệp nào thường được liên kết với tệp thực thi trên Windows?", options: [".txt", ".jpg", ".mp3", ".exe"], correctAnswerIndex: 3, explanation: "Tệp .exe (executable) là tệp chương trình có thể chạy được trên hệ điều hành Windows." },
          ],
        },
      ],
    },
    {
      id: 'zone2',
      name: 'Vùng Dữ Liệu: Lập Trình Cơ Bản',
      description: 'Các cấu trúc lệnh và thuật toán trong lập trình.',
      gates: [
        {
          id: 'gate2_1',
          name: 'Cổng Mạng 1: Syntax Scan',
          type: 'easy',
          questions: [
            { text: "Trong Pascal, từ khóa để khai báo biến là gì?", options: ["var", "int", "string", "const"], correctAnswerIndex: 0, explanation: "Từ khóa 'var' được sử dụng để bắt đầu một khối khai báo biến trong ngôn ngữ lập trình Pascal." },
            { text: "Vòng lặp `for` thường được sử dụng khi nào?", options: ["Khi không biết số lần lặp", "Khi số lần lặp được xác định trước", "Chỉ để lặp qua mảng", "Khi điều kiện lặp luôn đúng"], correctAnswerIndex: 1, explanation: "Vòng lặp `for` là lựa chọn lý tưởng khi bạn biết chính xác số lần cần thực hiện một khối lệnh." },
          ],
        },
      ],
    },
  ],
};

export const INITIAL_GAME_STATE: GameState = {
  currentScreen: 'main_menu',
  player: {
    level: 1,
    xp: 0,
    codeBlocks: 50,
  },
  completedChallenges: [],
};
