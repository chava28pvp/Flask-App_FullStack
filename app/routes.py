from flask import Blueprint, render_template, redirect, url_for, request, flash
from flask_login import login_required, current_user
from .models import Task
from . import db

main = Blueprint('main', __name__)

@main.route('/')
def home():
    return redirect(url_for('main.dashboard'))

@main.route('/dashboard')
@login_required
def dashboard():
    tasks = Task.query.filter_by(user_id=current_user.id).order_by(Task.created_at.desc()).all()
    return render_template('tasks/dashboard.html', tasks=tasks)

@main.route('/add', methods=['POST'])
@login_required
def add_task():
    description = request.form.get('description')
    if not description:
        flash('La descripción no puede estar vacía.', 'warning')
    else:
        task = Task(description=description, user_id=current_user.id)
        db.session.add(task)
        db.session.commit()
        flash('Tarea agregada.', 'success')
    return redirect(url_for('main.dashboard'))

@main.route('/complete/<int:task_id>')
@login_required
def complete_task(task_id):
    task = Task.query.get_or_404(task_id)
    if task.user_id != current_user.id:
        flash('No autorizado.', 'danger')
        return redirect(url_for('main.dashboard'))
    task.is_completed = not task.is_completed
    db.session.commit()
    return redirect(url_for('main.dashboard'))

@main.route('/delete/<int:task_id>')
@login_required
def delete_task(task_id):
    task = Task.query.get_or_404(task_id)
    if task.user_id != current_user.id:
        flash('No autorizado.', 'danger')
        return redirect(url_for('main.dashboard'))
    db.session.delete(task)
    db.session.commit()
    flash('Tarea eliminada.', 'info')
    return redirect(url_for('main.dashboard'))
