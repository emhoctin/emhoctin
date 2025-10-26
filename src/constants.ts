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
            id: 'l1-nb-mc-1', type: 'multiple-choice', text: 'Trong tin học, 1 Byte bằng bao nhiêu Bit?',
            options: ['10 Bit', '8 Bit', '16 Bit', '4 Bit'], correctOptionIndex: 1,
            explanation: 'Đáp án đúng là B. Theo quy ước, 1 Byte = 8 Bit.', xp: 10,
          },
          {
            id: 'l1-nb-mc-2', type: 'multiple-choice', text: 'Đơn vị đo lường thông tin nhỏ nhất là gì?',
            options: ['Byte', 'Bit', 'Kilobyte', 'Megabyte'], correctOptionIndex: 1,
            explanation: 'Đáp án đúng là B. Bit là đơn vị cơ bản nhất, biểu diễn một trong hai trạng thái 0 hoặc 1.', xp: 10,
          },
          {
            id: 'l1-nb-mc-3', type: 'multiple-choice', text: 'Thiết bị nào sau đây là thiết bị VÀO (input)?',
            options: ['Màn hình', 'Máy in', 'Loa', 'Bàn phím'], correctOptionIndex: 3,
            explanation: 'Đáp án đúng là D. Bàn phím dùng để nhập dữ liệu và lệnh vào máy tính.', xp: 10,
          },
          {
            id: 'l1-nb-tf-1', type: 'true-false', text: 'Xác định các nhận định sau là Đúng (Đ) hay Sai (S):',
            statements: [
              'A. Dữ liệu là đối tượng được xử lý của máy tính.',
              'B. Thông tin là kết quả có được sau khi xử lý dữ liệu.',
              'C. Máy tính có thể xử lý trực tiếp hình ảnh, âm thanh mà không cần mã hóa.',
              'D. RAM là bộ nhớ chỉ đọc.'
            ], correctAnswers: [true, true, false, false],
            explanation: 'Đáp án: Đ-Đ-S-S. C: Mọi dữ liệu đều phải được mã hóa thành dãy bit. D: RAM là bộ nhớ truy cập ngẫu nhiên, có thể đọc và ghi.', xp: 15,
          },
           {
            id: 'l1-nb-mc-4', type: 'multiple-choice', text: 'CPU là viết tắt của cụm từ nào?',
            options: ['Central Process Unit', 'Central Processing Unit', 'Computer Personal Unit', 'Central Power Unit'], correctOptionIndex: 1,
            explanation: 'Đáp án đúng là B. CPU (Central Processing Unit) là bộ xử lý trung tâm của máy tính.', xp: 10,
          },
        ],
      },
       {
        id: 'gate-1-th',
        name: 'Gỡ Lỗi [TH]',
        type: 'medium',
        questions: [
          {
            id: 'l1-th-mc-1', type: 'multiple-choice', text: 'Thiết bị nào sau đây là thiết bị vào-ra?',
            options: ['Máy in', 'Bàn phím', 'Màn hình cảm ứng', 'Chuột'], correctOptionIndex: 2,
            explanation: 'Đáp án đúng là C. Màn hình cảm ứng vừa là thiết bị vào (nhận tương tác) vừa là thiết bị ra (hiển thị hình ảnh).', xp: 20,
          },
          {
            id: 'l1-th-mc-2', type: 'multiple-choice', text: 'Để lưu trữ một tệp phim 4GB, bạn cần một thiết bị lưu trữ có dung lượng tối thiểu là bao nhiêu?',
            options: ['4000 MB', '4096 MB', '4096 Bit', '4000 KB'], correctOptionIndex: 1,
            explanation: 'Đáp án đúng là B. 1 GB = 1024 MB, vậy 4 GB = 4 * 1024 = 4096 MB.', xp: 20,
          },
          {
            id: 'l1-th-tf-1', type: 'true-false', text: 'Xác định tính đúng sai của các phát biểu về xử lý thông tin:',
            statements: [
                'A. Thông tin là dữ liệu đã được xử lý để trở nên có ý nghĩa.',
                'B. Mọi dữ liệu thu thập được đều là thông tin hữu ích.',
                'C. Quá trình xử lý thông tin bao gồm 3 bước: Nhập, Xử lý, Xuất.',
                'D. Ổ cứng (HDD/SSD) là nơi lưu trữ dữ liệu tạm thời khi máy hoạt động.'
            ], correctAnswers: [true, false, true, false],
            explanation: 'Đáp án: Đ-S-Đ-S. B: Dữ liệu cần được xử lý mới trở thành thông tin. D: RAM mới là nơi lưu trữ tạm thời, ổ cứng lưu trữ lâu dài.', xp: 25
          },
           {
            id: 'l1-th-mc-3', type: 'multiple-choice', text: 'Hệ đếm nào được máy tính sử dụng làm cơ sở?',
            options: ['Hệ thập phân (cơ số 10)', 'Hệ nhị phân (cơ số 2)', 'Hệ bát phân (cơ số 8)', 'Hệ thập lục phân (cơ số 16)'], correctOptionIndex: 1,
            explanation: 'Đáp án đúng là B. Máy tính sử dụng hệ nhị phân (gồm 2 chữ số 0 và 1) để biểu diễn mọi dữ liệu.', xp: 20,
          },
           {
            id: 'l1-th-mc-4', type: 'multiple-choice', text: 'Chức năng chính của hệ điều hành là gì?',
            options: ['Soạn thảo văn bản', 'Chơi game', 'Quản lí và điều khiển phần cứng, phần mềm', 'Truy cập Internet'], correctOptionIndex: 2,
            explanation: 'Đáp án đúng là C. Hệ điều hành là phần mềm hệ thống làm trung gian giữa người dùng và phần cứng máy tính.', xp: 20,
          }
        ]
       },
       {
        id: 'gate-1-boss',
        name: 'Trùm Cuối: Malware Boss',
        type: 'boss',
        questions: [
          {
            id: 'l1-boss-tf-1', type: 'true-false', text: 'Đánh giá các luồng dữ liệu sau. Đâu là luồng hợp lệ (Đ) và đâu là luồng gây lỗi (S)?',
            statements: [
              'A. 1 KB (Kilobyte) tương đương 1024 Bit.',
              'B. Dữ liệu sau khi được CPU xử lý sẽ trở thành thông tin có ích.',
              'C. Màn hình cảm ứng chỉ là một thiết bị ra (output device).',
              'D. Mã hóa End-to-End đảm bảo chỉ người gửi và người nhận đọc được tin nhắn.'
            ], correctAnswers: [false, true, false, true],
            explanation: 'Đáp án: S-Đ-S-Đ. A: 1 KB = 1024 Bytes, và 1 Byte = 8 Bits, vậy 1KB = 8192 Bits. C: Màn hình cảm ứng là thiết bị vào-ra. D: Đó chính là định nghĩa của mã hóa đầu cuối.', xp: 50,
          }
        ],
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
            id: 'l2-nb-mc-1', type: 'multiple-choice', text: 'Đâu là một đặc trưng của xã hội tri thức?',
            options: [
              'Sản xuất nông nghiệp là hoạt động chính.',
              'Mọi hoạt động đều có sự hỗ trợ của thiết bị số.',
              'Kiến thức và sáng tạo là động lực phát triển.',
              'Giao tiếp chủ yếu bằng thư tay.'
            ], correctOptionIndex: 2,
            explanation: 'Đáp án đúng là C. Trong xã hội tri thức, tri thức, thông tin, và sự sáng tạo được coi là nguồn lực quan trọng nhất.', xp: 10,
          },
          {
            id: 'l2-nb-mc-2', type: 'multiple-choice', text: 'Thiết bị nào sau đây được coi là thiết bị thông minh?',
            options: ['Máy tính bỏ túi Casio', 'Điện thoại thông minh (Smartphone)', 'Đài radio AM/FM', 'Bếp ga'], correctOptionIndex: 1,
            explanation: 'Đáp án đúng là B. Điện thoại thông minh có hệ điều hành, khả năng kết nối mạng và cài đặt ứng dụng.', xp: 10,
          },
          {
            id: 'l2-nb-tf-1', type: 'true-false', text: 'Xác định các nhận định sau về kinh tế tri thức là Đúng (Đ) hay Sai (S):',
            statements: [
                'A. Kinh tế tri thức dựa chủ yếu vào tài nguyên thiên nhiên.',
                'B. Thương mại điện tử là một phần của kinh tế tri thức.',
                'C. Bằng phát minh, sáng chế là tài sản trí tuệ quan trọng.',
                'D. Lao động chân tay được đánh giá cao hơn lao động trí óc.'
            ], correctAnswers: [false, true, true, false],
            explanation: 'Đáp án: S-Đ-Đ-S. Kinh tế tri thức dựa vào tri thức và công nghệ, đề cao tài sản trí tuệ và lao động trí óc.', xp: 15
          },
           {
            id: 'l2-nb-mc-3', type: 'multiple-choice', text: 'Thuật ngữ nào dùng để chỉ việc công dân sử dụng công nghệ số để tham gia vào xã hội?',
            options: ['Công dân điện tử', 'Công dân toàn cầu', 'Công dân số', 'Công dân mạng'], correctOptionIndex: 2,
            explanation: 'Đáp án đúng là C. Công dân số (Digital Citizen) là người có kỹ năng và kiến thức để sử dụng công nghệ số một cách an toàn và có trách nhiệm.', xp: 10,
          },
        ],
      },
      {
        id: 'gate-2-th',
        name: 'Gỡ Lỗi [TH]',
        type: 'medium',
        questions: [
           {
            id: 'l2-th-tf-1', type: 'true-false', text: 'Xác định các nhận định sau là Đúng (Đ) hay Sai (S) về thiết bị số:',
            statements: [
              'A. Máy tính xách tay là một thiết bị thông minh.',
              'B. Mọi thiết bị số đều là thiết bị thông minh.',
              'C. Thiết bị thông minh có thể kết nối với các thiết bị khác.',
              'D. Đồng hồ cơ là một thiết bị thông minh.'
            ], correctAnswers: [true, false, true, false],
            explanation: 'Đáp án: Đ-S-Đ-S. B: Không phải mọi thiết bị số đều thông minh (ví dụ: máy tính Casio cũ). D: Đồng hồ cơ không phải là thiết bị số.', xp: 25,
          },
          {
            id: 'l2-th-mc-1', type: 'multiple-choice', text: 'Internet of Things (IoT) có nghĩa là gì?',
            options: [
                'Một mạng xã hội dành cho robot.',
                'Mạng lưới các thiết bị vật lý được kết nối internet.',
                'Một loại tiền ảo mới.',
                'Tên của một hệ điều hành.'
            ], correctOptionIndex: 1,
            explanation: 'Đáp án đúng là B. IoT là mạng lưới kết nối các đồ vật, thiết bị hàng ngày với internet để thu thập và trao đổi dữ liệu.', xp: 20
          },
          {
            id: 'l2-th-mc-2', type: 'multiple-choice', text: 'Hành động nào sau đây thể hiện văn hóa ứng xử tốt trên mạng?',
            options: ['Bình luận tiêu cực về ngoại hình người khác.', 'Chia sẻ thông tin cá nhân của bạn bè mà không hỏi ý kiến.', 'Tôn trọng quan điểm khác biệt và tranh luận văn minh.', 'Lan truyền tin đồn chưa kiểm chứng.'], correctOptionIndex: 2,
            explanation: 'Đáp án đúng là C. Tôn trọng và giao tiếp văn minh là nền tảng của văn hóa ứng xử trên không gian số.', xp: 20
          },
           {
            id: 'l2-th-tf-2', type: 'true-false', text: 'Xác định các nhận định sau về "dấu chân số" (digital footprint) là Đúng (Đ) hay Sai (S):',
            statements: [
              'A. Dấu chân số là tất cả dữ liệu bạn để lại khi hoạt động trực tuyến.',
              'B. Chỉ có bạn mới có thể xem được dấu chân số của mình.',
              'C. Dấu chân số có thể ảnh hưởng đến uy tín cá nhân của bạn.',
              'D. Xóa lịch sử trình duyệt sẽ xóa hoàn toàn dấu chân số của bạn.'
            ], correctAnswers: [true, false, true, false],
            explanation: 'Đáp án: Đ-S-Đ-S. Dấu chân số của bạn có thể được người khác xem và nó rất khó để xóa hoàn toàn.', xp: 25,
          },
        ]
      }
    ]
  },
];
