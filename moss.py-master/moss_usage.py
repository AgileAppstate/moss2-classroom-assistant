import mosspy
import sys
import os

userid = 958162982 # add your userid here

m = mosspy.Moss(userid, "python")

#m.addBaseFile("submission/a01.py")
#m.addBaseFile("submission/test_student.py")

# Submission Files
#m.addFile("submission/a01-sample.py")

tmp_path = 'C:/tmp/'
for dir in os.listdir(tmp_path):
    path = os.path.join(tmp_path, dir)
    m.addFilesByWildcard(f'{path}/birdas1/*.py')

# progress function optional, run on every file uploaded
# result is submission URL
url = m.send(lambda file_path, display_name: print('*', end='', flush=True))
#print()

#rint ("Report URL: " + url)

if os.path.exists('subs'):
    # Save report file
    m.saveWebPage(url, "subs/report.html")
else: 
    os.makedirs('subs')
    m.saveWebPage(url, "subs/report.html")

if not os.path.exists('subs/report'):
    os.makedirs('subs/report')

mosspy.download_report(url, "subs/report/", connections=8, log_level=10, on_read=lambda url: print('*', end='', flush=True)) 
# log_level=logging.DEBUG (20 to disable)
# on_read function run for every downloaded file
