import click
def print_color(s, fg_color, bg_color):
    return click.echo(click.style(s, fg=fg_color, bg=bg_color) )
