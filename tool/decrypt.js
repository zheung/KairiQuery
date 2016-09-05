let fs = require('fs'), crypto = require('crypto');

let DecryptAsm = (buffer) => {
	if(buffer.length > 256) {
		let num = buffer.readUInt32LE(32);

		if(num != 0) {
			let index = num ^ buffer.readUInt32LE(40);
			let num2 = (num ^ buffer.readUInt32LE(36)) + index;

			for (let i = 32; i < 44; i++) buffer[i] = 0;

			if (buffer.length > num2) {
				let num3 = num2 - 2, num4 = num2 - 1;

				buffer[num4] = buffer[num4] ^ buffer[index];

				if (index <= (num2 - 2)) {
					let num5 = num2;

					do {
						let num6 = buffer[num5-- - 1];
						buffer[num5 - 1] = buffer[num5 - 1] ^ num6;
						num3--;
					}
					while (index <= num3);
				}
			}
		}
	}

	return buffer;
};

let SCRAMBLE_KEY1 = [96, 112, 32, 96, 96, 96, 96, 96, 96, 96, 96, 32, 96, 96, 96, 96, 112, 112, 112, 0, 0],
	SCRAMBLE_KEY2 = [10, 0, 14, 8, 5, 1, 4, 12, 15, 3, 11, 14, 9, 5, 13, 9, 4, 3, 5, 13, 10],
	SCRAMBLE_KEY3 = [1, 2, 3, 6, 5, 1, 7, 11, 13, 2, 10, 15, 8, 5, 1, 9, 116, 3, 5, 3, 0];

let DecryptCsv = (buffer) => {
	let result = Buffer.alloc(buffer.length);

	let num = SCRAMBLE_KEY1.length, index = 0 % num;

	for (let i = 0; i < buffer.length; i++) {
		let num2 = SCRAMBLE_KEY1[index];

		num2 = (num2 + SCRAMBLE_KEY3[(index + 8) % num]);
		num2 = (num2 + SCRAMBLE_KEY2[(index + 3) % num]);
		result[i] = buffer[i] - num2;
		index++;
		index = index % num;
	}

	return result;
};
let EncryptCsv = (buffer) => {
	let result = Buffer.alloc(buffer.length);

	let num = SCRAMBLE_KEY1.length, index = 0 % num;

	for (let i = 0; i < buffer.length; i++) {
		let num2 = SCRAMBLE_KEY1[index];

		num2 = (num2 + SCRAMBLE_KEY3[(index + 8) % num]);
		num2 = (num2 + SCRAMBLE_KEY2[(index + 3) % num]);
		result[i] = buffer[i] + num2;
		index++;
		index = index % num;
	}

	return result;
};

let DecryptAes = (buffer) => {

}

// fs.writeFileSync('card2.csv', DecryptCsv(fs.readFileSync('card.csv')));
// fs.writeFileSync('card3.csv', EncryptCsv(fs.readFileSync('card2.csv')));
// fs.writeFileSync('Assembly-CSharp2.dll', DecryptAsm(fs.readFileSync('Assembly-CSharp.dll')));