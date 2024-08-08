class TaiKhoanNganHang {
    // Trường riêng tư
    #soTaiKhoan;
    #soDu;
    #pin;

    constructor(soTaiKhoan, soDuBanDau, pin) {
        this.#soTaiKhoan = soTaiKhoan;
        this.#soDu = soDuBanDau;
        this.#pin = pin; // Mã PIN riêng tư
    }

    // Phương thức công khai để nạp tiền (không cần PIN)
    napTien(soTien) {
        if (soTien > 0) {
            this.#soDu += soTien;
            console.log(`Đã nạp: $${soTien}`);
        } else {
            console.log("Số tiền nạp phải là số dương");
        }
    }

    // Phương thức công khai để rút tiền (yêu cầu PIN)
    rutTien(soTien, pin) {
        if (this.#kiemTraPin(pin)) {
            if (soTien > 0 && soTien <= this.#soDu) {
                this.#soDu -= soTien;
                console.log(`Đã rút: $${soTien}`);
            } else {
                console.log("Số tiền rút không hợp lệ");
            }
        } else {
            console.log("PIN không đúng");
        }
    }

    // Phương thức công khai để hiển thị số dư (yêu cầu PIN)
    hienThiSoDu(pin) {
        if (this.#kiemTraPin(pin)) {
            console.log(`Số dư tài khoản: $${this.#soDu}`);
        } else {
            console.log("PIN không đúng");
        }
    }

    // Phương thức riêng tư để kiểm tra PIN
    #kiemTraPin(pin) {
        return this.#pin === pin;
    }

    // Phương thức riêng tư để định dạng tiền tệ
    #dinhDangTienTe(soTien) {
        return `$${soTien.toFixed(2)}`;
    }

    // Phương thức công khai để lấy số dư đã định dạng (sử dụng phương thức riêng tư, yêu cầu PIN)
    laySoDuDinhDang(pin) {
        if (this.#kiemTraPin(pin)) {
            console.log(`Số dư đã định dạng: ${this.#dinhDangTienTe(this.#soDu)}`);
        } else {
            console.log("PIN không đúng");
        }
    }
}

// Sử dụng
const taiKhoan = new TaiKhoanNganHang(123456789, 500, 1234);
taiKhoan.napTien(150);
taiKhoan.hienThiSoDu(1234); // Số dư tài khoản: $650
taiKhoan.rutTien(100, 1234); // Đã rút: $100
taiKhoan.hienThiSoDu(1234); // Số dư tài khoản: $550
taiKhoan.laySoDuDinhDang(1234); // Số dư đã định dạng: $550.00

// Cố gắng thực hiện hành động với PIN sai
taiKhoan.hienThiSoDu(1111); // PIN không đúng
taiKhoan.rutTien(100, 1111); // PIN không đúng
