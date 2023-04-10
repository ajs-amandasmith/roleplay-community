# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts "🌱 Seeding data..."

User.destroy_all
Character.destroy_all
Post.destroy_all
Comment.destroy_all

ActiveRecord::Base.connection.reset_pk_sequence!('users')
ActiveRecord::Base.connection.reset_pk_sequence!('characters')
ActiveRecord::Base.connection.reset_pk_sequence!('posts')
ActiveRecord::Base.connection.reset_pk_sequence!('comments')

User.create(username: "Bob", about_me: "Hello, my name's Bob and I like to write things.", password_digest: "Bob123")
User.create(username: "Writes4U", about_me: "Creating things really is the best thing in the world!", password_digest: "Writes4U")
User.create(username: "I'M LOUD", about_me: "WRITING MAKES ME HAPPY", password_digest: "ALLCAPS")

Character.create(user_id: 1, name: "Potato Head", about: "Just a potato living in a man's world.")
Character.create(user_id: 1, name: "Cheddar", about: "You like cheese?")
Character.create(user_id: 2, name: "Barbie", about: "Sup, y'all?")

Post.create(title: "I am a Post!", post: "This is the first post on this page!", user_id: 1, character_id: 1)
Post.create(title: "I'm another Post!", post: "This is the best post ever!", user_id: 1, character_id: 2)
Post.create(title: "At my Mansion", post: "I welcome everyone to my place so we can have a nice, fun pool party! Woo!", user_id: 2, character_id: 3)

Comment.create(comment: "This really is a post.", user_id: 2, post_id: 1, character_id: 3)
Comment.create(comment: "Agreed.", user_id: 1, post_id: 1, character_id: 2)

puts "✅ Done seeding!"