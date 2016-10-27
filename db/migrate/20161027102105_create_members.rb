class CreateMembers < ActiveRecord::Migration[5.0]
  def change
    create_table :members do |t|
      t.belongs_to :user, foreign_key: true, required: false
      t.belongs_to :team, foreign_key: true, required: true
      t.boolean :admin, default: false

      t.timestamps

      t.index [:team_id, :user_id]
    end
  end
end
