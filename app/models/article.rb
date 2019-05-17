class Article < ApplicationRecord
	belongs_to :user, optional: true
	mount_uploader :video, VideoUploader
	validates :title, :video, :presence => true
end
