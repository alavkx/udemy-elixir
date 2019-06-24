defmodule Discuss.Repo.Migrations.AddUsers2 do
  use Ecto.Migration

  def change do
    create table(:users) do
      add(:email, :string)
      add(:provider, :string)
      add(:token, :string)

      timestamps()
    end
  end
end
