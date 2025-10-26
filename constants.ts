import { Zone, LevelData } from './types';

export const LEVELS: LevelData[] = [
  { level: 1, title: 'Tân Binh Mạng', xpToNextLevel: 100 },
  { level: 2, title: 'Kỹ Sư Tập Sự', xpToNextLevel: 250 },
  { level: 3, title: 'Chuyên Gia Gỡ Lỗi', xpToNextLevel: 500 },
  { level: 4, title: 'Kiến Trúc Sư Hệ Thống', xpToNextLevel: 1000 },
  { level: 5, title: 'Bậc Thầy Mạng Lưới', xpToNextLevel: 9999 },
];

export const ZONES: Zone[] = [
  {
    id: 'lesson-1',
    name: 'Vùng Dữ Liệu 01: Dữ liệu, Thông tin và Xử lý thông tin',
    description: 'Nạp các khái niệm nền tảng về thế giới số. Phân biệt và xử lý các đơn vị thông tin cơ bản.',
    gates: [
      {
        id: 'gate-1-nb',
        name: 'Cổng Mạng [NB]',
        type: 'easy',
        questions: [
          {
            id: 'l1-nb-mc-1',
            type: 'multiple-choice',
            text: 'Trong tin học, 1 Byte bằng bao nhiêu Bit?',
            options: ['10 Bit', '8 Bit', '16 Bit', '4 Bit'],
            correctOptionIndex: 1,
            explanation: 'Đáp án đúng là B. Theo quy ước, 1 Byte = 8 Bit.',
            xp: 10,
          },
          {
            id: 'l1-nb-tf-1',
            type: 'true-false',
            text: 'Xác định các nhận định sau là Đúng (Đ) hay Sai (S):',
            statements: [
              'A. Dữ liệu là đối tượng được xử lý của máy tính.',
              'B. Lệnh điều khiển máy tính thực hiện một nhiệm vụ nào đó gọi là thông tin.',
              'C. Kết quả của việc xử lý dữ liệu là dữ liệu.',
              'D. Máy tính có thể xử lý trực tiếp thông tin mà con người hiểu.'
            ],
            correctAnswers: [true, false, false, false], // Đ-S-S-S
            explanation: 'Đáp án: Đ-S-S-S. B: Lệnh điều khiển là chương trình. C: Kết quả xử lý dữ liệu là thông tin. D: Máy tính xử lý dữ liệu, không phải thông tin.',
            xp: 15,
          }
        ],
      },
       {
        id: 'gate-1-th',
        name: 'Gỡ Lỗi [TH]',
        type: 'medium',
        questions: [
          {
            id: 'l1-th-mc-1',
            type: 'multiple-choice',
            text: 'Thiết bị nào sau đây là thiết bị vào-ra?',
            options: ['Máy in', 'Bàn phím', 'Màn hình cảm ứng', 'Chuột'],
            correctOptionIndex: 2,
            explanation: 'Đáp án đúng là C. Màn hình cảm ứng vừa là thiết bị vào (nhận tương tác) vừa là thiết bị ra (hiển thị hình ảnh).',
            xp: 20,
          },
        ]
       }
    ],
  },
  {
    id: 'lesson-2',
    name: 'Vùng Dữ Liệu 02: Vai trò của thiết bị số và xã hội tri thức',
    description: 'Khám phá sự ảnh hưởng của công nghệ số đến xã hội và các thiết bị thông minh xung quanh chúng ta.',
    gates: [
      {
        id: 'gate-2-nb',
        name: 'Cổng Mạng [NB]',
        type: 'easy',
        questions: [
          {
            id: 'l2-nb-mc-1',
            type: 'multiple-choice',
            text: 'Đâu là một đặc trưng của xã hội tri thức?',
            options: [
              'Sản xuất nông nghiệp là hoạt động chính.',
              'Mọi hoạt động đều có sự hỗ trợ của thiết bị số.',
              'Kiến thức và sáng tạo là động lực phát triển.',
              'Giao tiếp chủ yếu bằng thư tay.'
            ],
            correctOptionIndex: 2,
            explanation: 'Đáp án đúng là C. Trong xã hội tri thức, tri thức, thông tin, và sự sáng tạo được coi là nguồn lực quan trọng nhất.',
            xp: 10,
          }
        ],
      },
      {
        id: 'gate-2-th',
        name: 'Gỡ Lỗi [TH]',
        type: 'medium',
        questions: [
           {
            id: 'l2-th-tf-1',
            type: 'true-false',
            text: 'Xác định các nhận định sau là Đúng (Đ) hay Sai (S) về thiết bị số:',
            statements: [
              'A. Máy tính xách tay là một thiết bị thông minh.',
              'B. Mọi thiết bị số đều là thiết bị thông minh.',
              'C. Thiết bị thông minh có thể kết nối với các thiết bị khác.',
              'D. Đồng hồ cơ là một thiết bị thông minh.'
            ],
            correctAnswers: [true, false, true, false], // Đ-S-Đ-S
            explanation: 'Đáp án: Đ-S-Đ-S. B: Không phải mọi thiết bị số đều thông minh (ví dụ: máy tính Casio cũ). D: Đồng hồ cơ không phải là thiết bị số.',
            xp: 25,
          }
        ]
      }
    ]
  },
];
