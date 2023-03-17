# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts "🌱 Seeding data..."

User.destroy_all

ActiveRecord::Base.connection.reset_pk_sequence!('users')

User.create(username: "Bob", about_me: "Hello, my name's Bob and I like to write things.", password_digest: "Bob123")
User.create(username: "Writes4U", about_me: "Creating things really is the best thing in the world!", password_digest: "Writes4U")
User.create(username: "I'M LOUD", about_me: "WRITING MAKES ME HAPPY", password_digest: "ALLCAPS")

Post.create(post: "I am a Post!", user_id: 1)

puts "✅ Done seeding!"