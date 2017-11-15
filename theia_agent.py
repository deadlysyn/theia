#!/usr/bin/env python3

#import ast
import csv
#import io
#import json
import subprocess
import sys


# move this to server
#import datetime
#from pymongo import MongoClient
# TODO: read from env
#client = MongoClient('localhost', 27017)
#db = client.theia
#collection = db.packages
# pkg = { name: 'val', version: 'val', arch: 'val' }
# ~or~
# pkg = { name: 'iptables', version: '1.23', arch: 'amd64', dist: 'ubuntu' }

def pkgs_submit():
    """batch submit packages to api"""
    pass

def pkgs_prep(pkg):
    """convert package details to json for api submission"""
    #name, ver, arch = pkg[:1][0], pkg[1:2][0], pkg[2:3][0]
    #name, ver, arch = pkg[0], pkg[1], pkg[2]
    #print('name: "{}", version: "{}", arch: "{}"'.format(type(name), type(ver), type(arch)))

    #print(json.dumps(pkg, sort_keys=True, indent=4))
    print(type(pkg))
    #print(len(pkg))
    print(pkg)
    #print(dir(pkg))
    #print(pkg[0])

def get_pkgs():
    """grab list of installed packages"""

    dist = subprocess.run(['uname', '-n'], stdout=subprocess.PIPE)
    if dist.stdout.decode('utf-8').startswith('ubuntu'):
        pkg_cmd = ['dpkg', '-l']
    elif dist.stdout.decode('utf-8').startswith('redhat'):
        pkg_cmd = ['rpm', '-q', '-l']
    else:
        print("ERROR: Unsupported OS.")
        sys.exit(1)

    pkgs = subprocess.run(pkg_cmd, stdout=subprocess.PIPE)
    for line in pkgs.stdout.decode('utf-8').splitlines():
        # name, version, arch
        pkgs_prep(line.split()[1:4])

    #pkgs = subprocess.Popen(pkg_cmd, stdout=subprocess.PIPE)
#    while True:
#        line = pkgs.stdout.readline().decode('utf-8')
#        if not line:
#            break
#        if line:
#            pkg_to_doc(line.split()[1:4])

def main():
    get_pkgs()


if __name__ == "__main__":
    main()
