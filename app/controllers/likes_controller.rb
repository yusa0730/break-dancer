class LikesController < ApplicationController
 	def create
	   	@like = Like.create(user_id: current_user.id, message_id: params[:message_id])
	   	@likes = Like.where(message_id: params[:message_id])
	   	@messages = Message.all
	   	@message = Message.find(params[:message_id])
	   	respond_to do |format|
		      format.js
		end
 	end
    def destroy
	   	like = Like.find_by(user_id: current_user.id, message_id: params[:message_id])
	   	like.destroy
	   	@likes = Like.where(message_id: params[:message_id])
	   	@messages = Message.all
	   	@message = Message.find(params[:message_id])
	   	respond_to do |format|
		      format.js
	    end
	end
end
