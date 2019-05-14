class PlacesController < ApplicationController

	  def index
	  end

	# 配送状況を変えるアクション。
	  def update
	    @place = Place.find(params[:id])
	    @place.update(place_params)
	    redirect_to places_path
	  end

# historyモデルにあるenumと関連付け
private
  def place_params
    params.require(:place).permit(:prefecture)
  end

end
