"""empty message

Revision ID: cf202b81b131
Revises: fc91a45da79e
Create Date: 2022-02-17 12:06:40.859241

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cf202b81b131'
down_revision = 'fc91a45da79e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('contact', sa.String(length=255), nullable=False))
    op.drop_constraint('users_email_key', 'users', type_='unique')
    op.create_unique_constraint('users_contact_key', 'users', ['contact'])
    op.drop_column('users', 'phone')
    op.drop_column('users', 'email')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    # op.add_column('users', sa.Column('email', sa.VARCHAR(length=255), autoincrement=False, nullable=False))
    # op.add_column('users', sa.Column('phone', sa.VARCHAR(), autoincrement=False, nullable=False))
    op.drop_constraint('users_contact_key', 'users', type_='unique')
    op.create_unique_constraint('users_email_key', 'users', ['email'])
    op.drop_column('users', 'contact')
    # ### end Alembic commands ###