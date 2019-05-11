class RelationshipsController < ApplicationController

    def create
      Relationship.create(create_params)
      @user = User.find(params[:following_id])
      respond_to do |format|
	      format.html { redirect_to @user }
	      format.js
      end
    end
    def destroy
      relationship =  Relationship.find(params[:id])
      @user = Relationship.find(params[:id]).following
      relationship.destroy
      respond_to do |format|
	      format.html { redirect_to @user }
	      format.js 
      end

    end
    private
    def create_params
        params.permit(:following_id).merge(follower_id: current_user.id)
    end
end
