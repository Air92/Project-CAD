from bokeh.plotting import figure, curdoc
from bokeh.driving import linear
import random

p = figure(plot_width=1500, plot_height=450)
p1 = figure(plot_width=1500, plot_height=450)

p.background_fill_color = "#000000"
p1.background_fill_color = "#000000"


r1 = p.line([], [], color="#53B4F5", line_width=2)
r2 = p.line([], [], color="#6E0D25", line_width=2)

r11 = p1.line([], [], color="#494947", line_width=2)
r21 = p1.line([], [], color="#E86F33", line_width=2)

ds1 = r1.data_source
ds2 = r2.data_source

ds11 = r11.data_source
ds21 = r21.data_source

@linear()
def update(step):
    ds1.data['x'].append(step)
    ds1.data['y'].append(random.randint(18,25))
    ds2.data['x'].append(step)
    ds2.data['y'].append(random.randint(17,22))  
    ds1.trigger('data', ds1.data, ds1.data)
    ds2.trigger('data', ds2.data, ds2.data)

    ds11.data['x'].append(step)
    ds11.data['y'].append(random.randint(2300,2800))
    ds21.data['x'].append(step)
    ds21.data['y'].append(random.randint(0,10))  
    ds11.trigger('data', ds11.data, ds11.data)
    ds21.trigger('data', ds21.data, ds21.data)

curdoc().add_root(p)
curdoc().add_root(p1)

# Add a periodic callback to be run every 500 milliseconds
curdoc().add_periodic_callback(update, 500)
