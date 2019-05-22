class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

         has_many :entries, dependent: :destroy
         has_many :messages, dependent: :destroy
         has_many :likes,dependent: :destroy
         has_many :articles
         attachment :profile_image

         # フォローしている（能動的関係上でフォローする側[relationship.rbでのbelongs_to :follower, class_name: "User"と対]）
         has_many :active_relationships,class_name: "Relationship", foreign_key: "follower_id", dependent: :destroy
         # フォローをされる
         # has_many :active_relationships,class_name: "Relationship", foreign_key: "following_id", dependent: :destroy

          # フォローされている（受動的関係）
         has_many :passive_relationships, class_name: "Relationship", foreign_key: "following_id", dependent: :destroy

         # フォローしているユーザーの集団を取り出す。
         has_many :following, through: :active_relationships, source: :following

         # フォロワーを取り出す
         has_many :followers, through: :passive_relationships, source: :follower

         # ユーザーをフォローする
         def follow(other_user)
         	active_relationships.create(following_id: other_user.id)
         end

         # ユーザーをアンフォローする
         def unfollow(other_user)
         	active_relationships.find_by(following_id: other_user.id).destroy
         end

         # 現在のユーザーがフォローしてたらtrueを返す。
         def following?(other_user)
         	following.include?(other_user)
         end
end
