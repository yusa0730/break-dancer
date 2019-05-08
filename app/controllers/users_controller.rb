class UsersController < ApplicationController
	before_action :authenticate_user!, except: [:top]

	def all
		@users = User.all
	end

	def show
		@user = User.find(params[:id])
		@currentUserEntry = Entry.where(user_id: current_user.id)
		@userEntry = Entry.where(user_id: @user.id)
		if @user.id == current_user.id
		else
			@currentUserEntry.each do |cu|
				@userEntry.each do |u|
					if cu.room_id == u.room_id then
						# 何がしたいのか？
						@isRoom = true
						@roomId = cu.room_id
					end
				end
			end
			if @isRoom
			else
				@room = Room.new
				@entry = Entry.new
			end
		end
	end

	def top
	end

	def index
	end


end
