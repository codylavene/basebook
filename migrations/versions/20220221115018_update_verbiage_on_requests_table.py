"""update verbiage on requests table

Revision ID: a42a0791ad0b
Revises: 6277ee752e8d
Create Date: 2022-02-21 11:50:18.879258

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a42a0791ad0b'
down_revision = '6277ee752e8d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('requests', sa.Column('sender_id', sa.Integer(), nullable=False))
    op.add_column('requests', sa.Column('receiver_id', sa.Integer(), nullable=False))
    op.drop_constraint('requests_requested_id_fkey', 'requests', type_='foreignkey')
    op.drop_constraint('requests_requester_id_fkey', 'requests', type_='foreignkey')
    op.create_foreign_key(None, 'requests', 'users', ['receiver_id'], ['id'])
    op.create_foreign_key(None, 'requests', 'users', ['sender_id'], ['id'])
    op.drop_column('requests', 'requested_id')
    op.drop_column('requests', 'requester_id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('requests', sa.Column('requester_id', sa.INTEGER(), autoincrement=False, nullable=False))
    op.add_column('requests', sa.Column('requested_id', sa.INTEGER(), autoincrement=False, nullable=False))
    op.drop_constraint(None, 'requests', type_='foreignkey')
    op.drop_constraint(None, 'requests', type_='foreignkey')
    op.create_foreign_key('requests_requester_id_fkey', 'requests', 'users', ['requester_id'], ['id'])
    op.create_foreign_key('requests_requested_id_fkey', 'requests', 'users', ['requested_id'], ['id'])
    op.drop_column('requests', 'receiver_id')
    op.drop_column('requests', 'sender_id')
    # ### end Alembic commands ###
