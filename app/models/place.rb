class Place < ApplicationRecord
	enum prefecture: { '東京': 0, '埼玉': 1, '神奈川': 2}
end
