class UsersController < ApplicationController
	before_action :authenticate_user!, except: [:top]

	def top
	end

	def index
		
	end


end
